import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ChildrenProp } from "../../Constant";

interface SynthesisContextProp {
    registeringImages: File[];
    registeredImages: File[];
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
    setDialogType: (type: string | null) => void;
    setRegisteringImages: (images: File[]) => void;
    requestImageRegister: ({
        id,
        email,
    }: {
        id: string;
        email: string;
    }) => void;
    getRegisteredImages: ({ id }: { id: string }) => void;
    handleRegisteredImageUpload: (inputFile: File) => void;
    handleFileUpload: (inputFile: File) => void;
    handleAuthorizedImageClick: (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => void;
    handleImageClick: (
        e:
            | React.MouseEvent<HTMLImageElement, MouseEvent>
            | React.MouseEvent<HTMLVideoElement, MouseEvent>
    ) => void;
    requestSynthesize: () => void;
}

const InitialSynthesisContext: SynthesisContextProp = {
    registeringImages: [],
    registeredImages: [],
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
    setDialogType: () => {},
    setRegisteringImages: () => {},
    requestImageRegister: () => {},
    getRegisteredImages: () => {},
    handleRegisteredImageUpload: () => {},
    handleFileUpload: () => {},
    handleAuthorizedImageClick: () => {},
    handleImageClick: () => {},
    requestSynthesize: () => {},
};

const SynthesisContext = createContext(InitialSynthesisContext);
export const useSynthesisContext = () => useContext(SynthesisContext);

export default function SynthesisProvider({ children }: ChildrenProp) {
    // 띄워져 있는 다이얼로그 종류
    const [dialogType, setDialogType] = useState<string | null>(null);
    // 등록할 제품 이미지들
    const [registeringImages, setRegisteringImages] = useState<File[]>([]);
    // 등록된 제품 이미지들 (서버에 요청해서 받아옴)
    const [registeredImages, setRegisteredImages] = useState<File[]>([]);
    // input 파일 및 변환된 URL
    const [registeredImage, setRegisteredImage] = useState<null | File>(null);
    const [registeredImageURL, setRegisteredImageURL] = useState<string | null>(
        null
    );
    const [photo, setPhoto] = useState<null | File>(null);
    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const [video, setVideo] = useState<null | File>(null);
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

    // 제품 등록 요청
    async function requestImageRegister({
        id,
        email,
    }: {
        id: string;
        email: string;
    }) {
        if (registeringImages.length !== 5) return;
        const formData = new FormData();
        formData.append("image0", registeringImages[0]);
        formData.append("image1", registeringImages[1]);
        formData.append("image2", registeringImages[2]);
        formData.append("image3", registeringImages[3]);
        formData.append("image4", registeringImages[4]);

        await axios
            .post<boolean>("http://localhost:5000/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    id: JSON.stringify(id),
                    email: JSON.stringify(email),
                },
            })
            .then((res) => {
                if (res.data) {
                    setDialogType(null);
                    alert(
                        "제품 등록에는 1일의 시간이 소요됩니다. 등록이 되면 신속하게 메일로 알려드리겠습니다!"
                    );
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                alert(
                    "죄송합니다. 제품 등록 중 오류가 발생했습니다. 홈페이지 하단의 연락처로 연락해 주시면 신속히 처리하겠습니다."
                );
                return;
            });
        return;
    }

    async function getRegisteredImages({ id }: { id: string }) {
        if (!id) {
            alert("찾으실 제품 아이디를 입력해주세요");
            return;
        }

        // await axios
        //     .get<File | null>(
        //         `http://localhost:5000/registered-image?product-id=${id}&product-index=0`,
        //         {
        //             responseType: "blob",
        //         }
        //     )
        //     .then((res) => {
        //         if (res.data) {
        //             console.log(res.data.name);
        //         }
        //     });

        const getImage = async (index: number) =>
            await axios
                .get<File>(
                    `http://localhost:5000/registered-image?product-id=${id}&product-index=${index}`,
                    { headers: { responseType: "blob" } }
                )
                .then((res) => {
                    console.log(res.data.name);
                    return res.data;
                });

        const images = await axios
            .all([
                getImage(0),
                getImage(1),
                getImage(2),
                getImage(3),
                getImage(4),
            ])
            .then((res) => {
                console.dir(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
                alert(
                    "죄송합니다. 등록된 제품을 받아오는 중 오류가 발생했습니다. 홈페이지 하단의 연락처로 연락해 주시면 신속히 처리하겠습니다."
                );
                return [];
            });
        return;
    }

    // input 파일 업로드 : 등록된 제품 이미지
    function handleRegisteredImageUpload(inputFile: File) {
        setRegisteredImage(inputFile);
        setRegisteredImageURL(URL.createObjectURL(inputFile));
    }

    // input 파일 업로드 : 합성 배경 이미지
    function handleFileUpload(inputFile: File) {
        if (inputFile.type.startsWith("image/")) {
            setPhoto(inputFile);
            setPhotoURL(URL.createObjectURL(inputFile));
            setVideo(null);
            setVideoURL(null);
        } else {
            setPhoto(null);
            setPhotoURL(null);
            setVideo(inputFile);
            setVideoURL(URL.createObjectURL(inputFile));
        }
    }

    // 등록된 이미지 클릭
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

    // 일반 이미지 클릭
    function handleImageClick(
        e:
            | React.MouseEvent<HTMLImageElement, MouseEvent>
            | React.MouseEvent<HTMLVideoElement, MouseEvent>
    ) {
        if (imageEvenClicked) {
            setImageCoord01(getImageCoord(e));
            setImageEvenClicked(!imageEvenClicked);
        } else {
            setImageCoord02(getImageCoord(e));
            setImageEvenClicked(!imageEvenClicked);
        }
    }

    //// 이미지 클릭 시 좌표 계산하고 반환하는 함수
    function getImageCoord(
        e:
            | React.MouseEvent<HTMLImageElement, MouseEvent>
            | React.MouseEvent<HTMLVideoElement, MouseEvent>
    ) {
        const rect = e.currentTarget.getBoundingClientRect();
        const xDistance = e.clientX - rect.left;
        const yDistance = e.clientY - rect.top;
        const imageWidth = e.currentTarget.offsetWidth;
        const imageHeigth = e.currentTarget.offsetHeight;
        const xcoord = Math.round((xDistance / imageWidth) * 10000) / 100;
        const ycoord = Math.round((yDistance / imageHeigth) * 10000) / 100;
        return [xcoord, ycoord];
    }

    // 합성 요청 :
    // (클릭된 좌표는 헤더에 넣어서 전송)
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
                            imageCoord01: JSON.stringify(imageCoord01),
                            imageCoord02: JSON.stringify(imageCoord02),
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
        registeringImages,
        registeredImages,
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
        setDialogType,
        setRegisteringImages,
        requestImageRegister,
        getRegisteredImages,
        handleRegisteredImageUpload,
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
