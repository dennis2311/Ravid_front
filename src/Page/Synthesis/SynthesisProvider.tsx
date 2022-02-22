import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ChildrenProp } from "../../Constant";

interface SynthesisContextProp {
    authorizedPhotoURL: string | null;
    photoURL: string | null;
    videoURL: string | null;
    authorizedImageCoord: number[];
    imageCoord: number[];
    synthesizedPhotoURL: string | null;
    synthesizedVideoURL: string | null;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setAuthorizedImageCoord: (value: number[]) => void;
    setImageCoord: (value: number[]) => void;
    getImageCoord: (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => number[];
    requestSynthesize: () => void;
}

const InitialSynthesisContext: SynthesisContextProp = {
    authorizedPhotoURL: null,
    photoURL: null,
    videoURL: null,
    authorizedImageCoord: [0, 0],
    imageCoord: [0, 0],
    synthesizedPhotoURL: null,
    synthesizedVideoURL: null,
    handleFileUpload: () => {},
    setAuthorizedImageCoord: () => {},
    setImageCoord: () => {},
    getImageCoord: () => {
        return [];
    },
    requestSynthesize: () => {},
};

const SynthesisContext = createContext(InitialSynthesisContext);
export const useSynthesisContext = () => useContext(SynthesisContext);

export default function SynthesisProvider({ children }: ChildrenProp) {
    const [authorizedPhoto, setAuthorizedPhoto] = useState<null | File>(null);
    const [photo, setPhoto] = useState<null | File>(null);
    const [video, setVideo] = useState<null | File>(null);
    const [authorizedPhotoURL, setAuthorizedPhotoURL] = useState<string | null>(
        null
    );
    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const [authorizedImageCoord, setAuthorizedImageCoord] = useState<number[]>([
        0, 0,
    ]);
    const [imageCoord, setImageCoord] = useState<number[]>([0, 0]);
    const [synthesizedPhotoURL, setSynthesizedPhotoURL] = useState<
        string | null
    >(null);
    const [synthesizedVideoURL, setSynthesizedVideoURL] = useState<
        string | null
    >(null);
    const imageType = ["image/png"];

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || !e.target.files.length) return;

        const inputFile: File = e.target.files[0];
        if (imageType.includes(inputFile.type)) {
            // 사진 파일인 경우
            if (isAuthorizedImage(inputFile.name)) {
                // 등록된 사진인 경우
                setAuthorizedPhoto(inputFile);
                setAuthorizedPhotoURL(URL.createObjectURL(inputFile));
            } else {
                // 일반 사진인 경우
                if (video) {
                    //// 이미 동영상을 먼저 선택한 경우
                    alertUnacceptableImage();
                } else {
                    setPhoto(inputFile);
                    setPhotoURL(URL.createObjectURL(inputFile));
                }
            }
        } else {
            // 동영상 파일인 경우
            setPhoto(null);
            setPhotoURL(null);
            setVideo(inputFile);
            setVideoURL(URL.createObjectURL(inputFile));
        }
    }

    function isAuthorizedImage(imageName: string) {
        if (imageName == "authorized-vitamin-image.png") return true;
        return false;
    }

    function alertUnacceptableImage() {
        alert(
            "등록되지 않은 이미지입니다. 관리자에게 제품의 동영상을 촬영하여 보내주시면(ship9136@naver.com), 빠른 시일 내에 제품을 등록하겠습니다."
        );
    }

    function getImageCoord(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const xDistance = e.clientX - rect.left;
        const yDistance = e.clientY - rect.top;
        const imageWidth = e.currentTarget.offsetWidth;
        const imageHeigth = e.currentTarget.offsetHeight;
        const xcoord = Math.round((xDistance / imageWidth) * 10000) / 100;
        const ycoord = Math.round((yDistance / imageHeigth) * 10000) / 100;
        return [xcoord, ycoord];
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
    }

    const synthesisContext = {
        authorizedPhotoURL,
        photoURL,
        videoURL,
        authorizedImageCoord,
        imageCoord,
        synthesizedPhotoURL,
        synthesizedVideoURL,
        handleFileUpload,
        setAuthorizedImageCoord,
        setImageCoord,
        getImageCoord,
        requestSynthesize,
    };

    return (
        <SynthesisContext.Provider value={synthesisContext}>
            {children}
        </SynthesisContext.Provider>
    );
}
