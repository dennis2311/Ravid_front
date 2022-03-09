import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ChildrenProp } from "../../Constant";

interface SynthesisContextProp {
    registeredImageURL: string | null;
    photo: File | null;
    video: File | null;
    photoURL: string | null;
    videoURL: string | null;
    authorizedImageCoord01: number[];
    authorizedImageCoord02: number[];
    imageCoord01: number[];
    imageCoord02: number[];
    synthesizedPhotoURL: string | null;
    synthesizedVideoURL: string | null;
    dialogType: string | null;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAuthorizedImageClick: (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => void;
    handleImageClick: (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => void;
    requestSynthesize: () => void;
    setDialogType: (type: string | null) => void;
}

const InitialSynthesisContext: SynthesisContextProp = {
    registeredImageURL: null,
    photo: null,
    video: null,
    photoURL: null,
    videoURL: null,
    authorizedImageCoord01: [50, 50],
    authorizedImageCoord02: [50, 50],
    imageCoord01: [50, 50],
    imageCoord02: [50, 50],
    synthesizedPhotoURL: null,
    synthesizedVideoURL: null,
    dialogType: null,
    handleFileUpload: () => {},
    handleAuthorizedImageClick: () => {},
    handleImageClick: () => {},
    requestSynthesize: () => {},
    setDialogType: () => {},
};

const SynthesisContext = createContext(InitialSynthesisContext);
export const useSynthesisContext = () => useContext(SynthesisContext);

export default function SynthesisProvider({ children }: ChildrenProp) {
    // input 파일 및 변환된 URL
    const [registeredImage, setRegisteredImage] = useState<null | File>(null);
    const [photo, setPhoto] = useState<null | File>(null);
    const [video, setVideo] = useState<null | File>(null);
    const [registeredImageURL, setRegisteredImageURL] = useState<string | null>(
        null
    );
    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const [videoURL, setVideoURL] = useState<string | null>(null);

    // 클릭 좌표, 좌표 클릭 횟수 짝수 여부
    const [authorizedImageCoord01, setAuthorizedImageCoord01] = useState<
        number[]
    >([50, 50]);
    const [authorizedImageCoord02, setAuthorizedImageCoord02] = useState<
        number[]
    >([50, 50]);
    const [imageCoord01, setImageCoord01] = useState<number[]>([50, 50]);
    const [imageCoord02, setImageCoord02] = useState<number[]>([50, 50]);
    const [authorizedImageEvenClicked, setAuthorizedImageEvenClicked] =
        useState<boolean>(true);
    const [imageEvenClicked, setImageEvenClicked] = useState<boolean>(true);

    // result 파일 변환 URL
    const [synthesizedPhotoURL, setSynthesizedPhotoURL] = useState<
        string | null
    >(null);
    const [synthesizedVideoURL, setSynthesizedVideoURL] = useState<
        string | null
    >(null);

    // 띄워져 있는 다이얼로그 종류
    const [dialogType, setDialogType] = useState<string | null>(null);

    const imageType = ["image/png"];

    // input 파일 업로드 관리
    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || !e.target.files.length) return;

        const inputFile: File = e.target.files[0];
        if (imageType.includes(inputFile.type)) {
            // 사진 파일인 경우
            if (isAuthorizedImage(inputFile.name)) {
                // 등록된 사진인 경우
                setRegisteredImage(inputFile);
                setRegisteredImageURL(URL.createObjectURL(inputFile));
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

    // 등록된 이미지인지 확인
    function isAuthorizedImage(imageName: string) {
        if (imageName === "authorized-vitamin-image.png") return true;
        return false;
    }

    // 등록되지 않은 이미지 업로드 시 경고창
    function alertUnacceptableImage() {
        alert(
            "등록되지 않은 이미지입니다. 관리자에게 제품의 동영상을 촬영하여 보내주시면(ship9136@naver.com), 빠른 시일 내에 제품을 등록하겠습니다."
        );
    }

    // 등록된 이미지 클릭 관리
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

    // 일반 이미지 클릭 관리
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

    // 이미지 클릭 시 좌표 계산하고 반환하는 함수
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

    // 서버 통신
    // 클릭된 좌표는 헤더에 넣어서 전송
    async function requestSynthesize() {
        if (!registeredImage) return;

        const formData = new FormData();
        formData.append("authorized-image", registeredImage);

        // 사진 + 사진 조합인 경우
        if (photo) {
            formData.append("photo", photo);

            await axios
                .post<File | null>(
                    "http://localhost:5000/synthesis-photo",
                    formData,
                    {
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
                    }
                )
                .then((res) => {
                    if (res.data) {
                        setSynthesizedPhotoURL(URL.createObjectURL(res.data));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            return;
        }

        // 사진 + 동영상 조합인 경우
        if (video) {
            formData.append("video", video);

            await axios
                .post<File | null>(
                    "http://localhost:5000/synthesis-video",
                    formData,
                    {
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
                    }
                )
                .then((res) => {
                    if (res.data) {
                        setSynthesizedVideoURL(URL.createObjectURL(res.data));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            return;
        }
    }

    const synthesisContext = {
        registeredImageURL,
        photo,
        video,
        photoURL,
        videoURL,
        authorizedImageCoord01,
        authorizedImageCoord02,
        imageCoord01,
        imageCoord02,
        synthesizedPhotoURL,
        synthesizedVideoURL,
        dialogType,
        handleFileUpload,
        handleAuthorizedImageClick,
        handleImageClick,
        requestSynthesize,
        setDialogType,
    };

    return (
        <SynthesisContext.Provider value={synthesisContext}>
            {children}
        </SynthesisContext.Provider>
    );
}
