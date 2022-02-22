import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ChildrenProp } from "../../Constant";

interface SynthesisContextProp {
    photo: null | File;
    video: null | File;
    uploadPhoto: (photo: File) => void;
    uploadVideo: (video: File) => void;
    requestSynthesize: () => void;
}

const InitialSynthesisContext: SynthesisContextProp = {
    photo: null,
    video: null,
    uploadPhoto: (photo: File) => {},
    uploadVideo: (video: File) => {},
    requestSynthesize: () => {},
};

const SynthesisContext = createContext(InitialSynthesisContext);
export const useSynthesisContext = () => useContext(SynthesisContext);

export default function SynthesisProvider({ children }: ChildrenProp) {
    const [photo, setPhoto] = useState<null | File>(null);
    const [video, setVideo] = useState<null | File>(null);
    const [synthesizedVideo, setSynthesizedVideo] = useState<null | File>(null);

    function uploadPhoto(photo: File) {
        console.log(`${photo.name}이 업로드 되었습니다.`);
        console.log(photo.type);
        setPhoto(photo);
        return;
    }

    function uploadVideo(video: File) {
        console.log(`${video.name}이 업로드 되었습니다.`);
        console.log(video.type);
        setVideo(video);
        return;
    }

    async function requestSynthesize() {
        const formData = new FormData();
        if (photo && video) {
            formData.append("photo", photo);
            formData.append("video", video);
        }

        await axios({
            method: "POST",
            url: "",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
        })
            .then((res) => {
                console.log(res.data);
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
        photo,
        video,
        uploadPhoto,
        uploadVideo,
        requestSynthesize,
    };

    return (
        <SynthesisContext.Provider value={synthesisContext}>
            {children}
        </SynthesisContext.Provider>
    );
}
