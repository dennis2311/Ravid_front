import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ChildrenProp } from "../../Constant";

interface SynthesisContextProp {
    photoURL: string | null;
    videoURL: string | null;
    imageCoord: number[];
    synthesizedVideoURL: string | null;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getImageCoord: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
    requestSynthesize: () => void;
}

const InitialSynthesisContext: SynthesisContextProp = {
    photoURL: null,
    videoURL: null,
    imageCoord: [0, 0],
    synthesizedVideoURL: null,
    handleFileUpload: () => {},
    getImageCoord: () => {},
    requestSynthesize: () => {},
};

const SynthesisContext = createContext(InitialSynthesisContext);
export const useSynthesisContext = () => useContext(SynthesisContext);

export default function SynthesisProvider({ children }: ChildrenProp) {
    const [photo, setPhoto] = useState<null | File>(null);
    const [video, setVideo] = useState<null | File>(null);
    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const [imageCoord, setImageCoord] = useState<number[]>([0, 0]);
    const [synthesizedVideoURL, setSynthesizedVideoURL] = useState<
        string | null
    >(null);
    const imageType = ["image/png"];

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || !e.target.files.length) return;

        const inputFile: File = e.target.files[0];
        if (imageType.includes(inputFile.type)) {
            if (inputFile.name != "authorized-vitamin-image.png") {
                alert(
                    "등록되지 않은 이미지입니다. 관리자에게 제품의 동영상을 촬영하여 보내주시면(ship9136@naver.com), 빠른 시일 내에 제품을 등록하겠습니다."
                );
                return;
            }
            setPhoto(inputFile);
            setPhotoURL(URL.createObjectURL(inputFile));
        } else {
            setVideo(inputFile);
            setVideoURL(URL.createObjectURL(inputFile));
        }
    }

    function getImageCoord(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const xDistance = e.clientX - rect.left;
        const yDistance = e.clientY - rect.top;
        const imageWidth = e.currentTarget.offsetWidth;
        const imageHeigth = e.currentTarget.offsetHeight;
        const xcoord = Math.round((xDistance / imageWidth) * 10000) / 100;
        const ycoord = Math.round((yDistance / imageHeigth) * 10000) / 100;
        setImageCoord([xcoord, ycoord]);
    }

    async function requestSynthesize() {
        if (!photo || !video) return;

        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("video", video);

        await axios({
            method: "POST",
            url: "http://localhost:5000/synthesis",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
        })
            .then((res) => {
                console.log(res.data);
                setSynthesizedVideoURL(URL.createObjectURL(res.data));
            })
            .catch((error) => {
                console.log(error);
            });

        // await axios
        //     .post<string>(`http://localhost:5000/synthesis`, formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     })
        //     .then((res) => {
        //         // setSynthesizedVideo(res.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    const synthesisContext = {
        photoURL,
        videoURL,
        imageCoord,
        synthesizedVideoURL,
        handleFileUpload,
        getImageCoord,
        requestSynthesize,
    };

    return (
        <SynthesisContext.Provider value={synthesisContext}>
            {children}
        </SynthesisContext.Provider>
    );
}
