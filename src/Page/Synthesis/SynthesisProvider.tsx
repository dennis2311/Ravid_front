import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ChildrenProp } from "../../Constant";

interface SynthesisContextProp {
    authorizedImageURL: string | null;
    photoURL: string | null;
    videoURL: string | null;
    authorizedImageCoord01: number[];
    authorizedImageCoord02: number[];
    imageCoord01: number[];
    imageCoord02: number[];
    synthesizedPhotoURL: string | null;
    synthesizedVideoURL: string | null;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAuthorizedImageClick: (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => void;
    handleImageClick: (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => void;
    requestSynthesize: () => void;
}

const InitialSynthesisContext: SynthesisContextProp = {
    authorizedImageURL: null,
    photoURL: null,
    videoURL: null,
    authorizedImageCoord01: [50, 50],
    authorizedImageCoord02: [50, 50],
    imageCoord01: [50, 50],
    imageCoord02: [50, 50],
    synthesizedPhotoURL: null,
    synthesizedVideoURL: null,
    handleFileUpload: () => {},
    handleAuthorizedImageClick: () => {},
    handleImageClick: () => {},
    requestSynthesize: () => {},
};

const SynthesisContext = createContext(InitialSynthesisContext);
export const useSynthesisContext = () => useContext(SynthesisContext);

export default function SynthesisProvider({ children }: ChildrenProp) {
    const [authorizedImage, setAuthorizedImage] = useState<null | File>(null);
    const [photo, setPhoto] = useState<null | File>(null);
    const [video, setVideo] = useState<null | File>(null);
    const [authorizedImageURL, setAuthorizedImageURL] = useState<string | null>(
        null
    );
    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const [authorizedImageEvenClicked, setAuthorizedImageEvenClicked] =
        useState<boolean>(true);
    const [authorizedImageCoord01, setAuthorizedImageCoord01] = useState<
        number[]
    >([50, 50]);
    const [authorizedImageCoord02, setAuthorizedImageCoord02] = useState<
        number[]
    >([50, 50]);
    const [imageEvenClicked, setImageEvenClicked] = useState<boolean>(true);
    const [imageCoord01, setImageCoord01] = useState<number[]>([50, 50]);
    const [imageCoord02, setImageCoord02] = useState<number[]>([50, 50]);
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
                setAuthorizedImage(inputFile);
                setAuthorizedImageURL(URL.createObjectURL(inputFile));
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
            // 동영상 파일인 경우 - 일반 사진은 초기화
            setPhoto(null);
            setPhotoURL(null);
            setVideo(inputFile);
            setVideoURL(URL.createObjectURL(inputFile));
        }
    }

    function isAuthorizedImage(imageName: string) {
        if (imageName === "authorized-vitamin-image.png") return true;
        return false;
    }

    function alertUnacceptableImage() {
        alert(
            "등록되지 않은 이미지입니다. 관리자에게 제품의 동영상을 촬영하여 보내주시면(ship9136@naver.com), 빠른 시일 내에 제품을 등록하겠습니다."
        );
    }

    function handleAuthorizedImageClick(
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) {
        if (authorizedImageEvenClicked) {
            setAuthorizedImageCoord01(getImageCoord(e));
            setAuthorizedImageEvenClicked(!authorizedImageEvenClicked);
        } else {
            setAuthorizedImageCoord02(getImageCoord(e));
            setAuthorizedImageEvenClicked(!authorizedImageEvenClicked);
        }
    }

    function handleImageClick(
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) {
        if (imageEvenClicked) {
            setImageCoord01(getImageCoord(e));
            setImageEvenClicked(!imageEvenClicked);
        } else {
            setImageCoord02(getImageCoord(e));
            setImageEvenClicked(!imageEvenClicked);
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
        return [xcoord, ycoord];
    }

    async function requestSynthesize() {
        if (!authorizedImage) return;

        const formData = new FormData();
        formData.append("authorized-image", authorizedImage);

        if (photo) {
            formData.append("photo", photo);

            await axios
                .post("http://localhost:5000/synthesis-photo", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorizedImageCoord01: JSON.stringify(
                            authorizedImageCoord01
                        ),
                        authorizedImageCoord02: JSON.stringify(
                            authorizedImageCoord02
                        ),
                        imageCoord01: JSON.stringify(imageCoord01),
                        imageCoord02: JSON.stringify(imageCoord02),
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
                        authorizedImageCoord01: JSON.stringify(
                            authorizedImageCoord01
                        ),
                        authorizedImageCoord02: JSON.stringify(
                            authorizedImageCoord02
                        ),
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
        photoURL,
        videoURL,
        authorizedImageCoord01,
        authorizedImageCoord02,
        imageCoord01,
        imageCoord02,
        synthesizedPhotoURL,
        synthesizedVideoURL,
        handleFileUpload,
        handleAuthorizedImageClick,
        handleImageClick,
        requestSynthesize,
    };

    return (
        <SynthesisContext.Provider value={synthesisContext}>
            {children}
        </SynthesisContext.Provider>
    );
}
