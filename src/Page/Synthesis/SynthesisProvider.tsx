import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ChildrenProp } from "../../Constant";

interface SynthesisContextProp {
<<<<<<< HEAD
    authorizedImageURL: string | null;
=======
    authorizedPhotoURL: string | null;
>>>>>>> 694505a5532c40eec4ee0c62139a5916379a3536
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
<<<<<<< HEAD
    authorizedImageURL: null,
=======
    authorizedPhotoURL: null,
>>>>>>> 694505a5532c40eec4ee0c62139a5916379a3536
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
<<<<<<< HEAD
    const [authorizedImage, setAuthorizedImage] = useState<null | File>(null);
    const [photo, setPhoto] = useState<null | File>(null);
    const [video, setVideo] = useState<null | File>(null);
    const [authorizedImageURL, setAuthorizedImageURL] = useState<string | null>(
=======
    const [authorizedPhoto, setAuthorizedPhoto] = useState<null | File>(null);
    const [photo, setPhoto] = useState<null | File>(null);
    const [video, setVideo] = useState<null | File>(null);
    const [authorizedPhotoURL, setAuthorizedPhotoURL] = useState<string | null>(
>>>>>>> 694505a5532c40eec4ee0c62139a5916379a3536
        null
    );
    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const [authorizedImageCoord, setAuthorizedImageCoord] = useState<number[]>([
<<<<<<< HEAD
        50, 50,
    ]);
    const [imageCoord, setImageCoord] = useState<number[]>([50, 50]);
=======
        0, 0,
    ]);
    const [imageCoord, setImageCoord] = useState<number[]>([0, 0]);
>>>>>>> 694505a5532c40eec4ee0c62139a5916379a3536
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
<<<<<<< HEAD
                setAuthorizedImage(inputFile);
                setAuthorizedImageURL(URL.createObjectURL(inputFile));
=======
                setAuthorizedPhoto(inputFile);
                setAuthorizedPhotoURL(URL.createObjectURL(inputFile));
>>>>>>> 694505a5532c40eec4ee0c62139a5916379a3536
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
<<<<<<< HEAD
            // 동영상 파일인 경우 - 일반 사진은 초기화
=======
            // 동영상 파일인 경우
>>>>>>> 694505a5532c40eec4ee0c62139a5916379a3536
            setPhoto(null);
            setPhotoURL(null);
            setVideo(inputFile);
            setVideoURL(URL.createObjectURL(inputFile));
        }
    }

    function isAuthorizedImage(imageName: string) {
<<<<<<< HEAD
        if (imageName === "authorized-vitamin-image.png") return true;
=======
        if (imageName == "authorized-vitamin-image.png") return true;
>>>>>>> 694505a5532c40eec4ee0c62139a5916379a3536
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
        if (!authorizedImage) return;

        const formData = new FormData();
<<<<<<< HEAD
        formData.append("authorized-image", authorizedImage);

        if (photo) {
            formData.append("photo", photo);

            await axios
                .post("http://localhost:5000/synthesis-photo", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorizedImageCoord:
                            JSON.stringify(authorizedImageCoord),
                        imageCoord: JSON.stringify(imageCoord),
                    },
                    responseType: "blob",
                })
                .then((res) => {
                    console.log(res.data);
                    console.log(URL.createObjectURL(res.data));
                    setSynthesizedPhotoURL(URL.createObjectURL(res.data));
                })
                .catch((error) => {
                    console.log(error);
                });

            return;
        }

        if (video) {
            formData.append("video", video);

            await axios
                .post("http://localhost:5000/synthesis-video", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorizedImageCoord:
                            JSON.stringify(authorizedImageCoord),
                    },
                    responseType: "blob",
                })
                .then((res) => {
                    setSynthesizedVideoURL(URL.createObjectURL(res.data));
                })
                .catch((error) => {
                    console.log(error);
                });

            return;
        }
    }

    const synthesisContext = {
        authorizedImageURL,
=======
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
>>>>>>> 694505a5532c40eec4ee0c62139a5916379a3536
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
