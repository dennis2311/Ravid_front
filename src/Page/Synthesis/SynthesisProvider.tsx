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
            console.log(`name of photo: ${photo.name}`);
            console.log(`name of video: ${video.name}`);
        }

        try {
            console.log(`상기 파일들의 전송을 시작합니다`);
            await axios
                .post<string>(`http://localhost:5000/synthesis`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    // setSynthesizedVideo(res.data);
                    console.log("성공적으로 응답을 받았습니다");
                });
        } catch (error) {
            console.log(`합성 요청 중 문제가 발생했습니다: ${error}`);
        }
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
