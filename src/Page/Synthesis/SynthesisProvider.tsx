import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ChildrenProp, API_ENDPOINT } from "../../Constant";

interface SynthesisContextProp {
    registeringImages: File[];
    registeredImageURL: string | null;
    photo: File | null;
    video: File | null;
    photoURL: string | null;
    videoURL: string | null;
    authorizedImageCoord01: number[];
    authorizedImageCoord02: number[];
    imageCoord01: number[];
    imageCoord02: number[];
    synthesizing: boolean;
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
    setRegisteredProductId: (id: string) => void;
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
    registeredImageURL: null,
    photo: null,
    video: null,
    photoURL: null,
    videoURL: null,
    authorizedImageCoord01: [50, 50],
    authorizedImageCoord02: [50, 50],
    imageCoord01: [50, 50],
    imageCoord02: [50, 50],
    synthesizing: false,
    synthesizedPhotoURL: null,
    synthesizedVideoURL: null,
    dialogType: null,
    setDialogType: () => {},
    setRegisteringImages: () => {},
    requestImageRegister: () => {},
    setRegisteredProductId: () => {},
    handleRegisteredImageUpload: () => {},
    handleFileUpload: () => {},
    handleAuthorizedImageClick: () => {},
    handleImageClick: () => {},
    requestSynthesize: () => {},
};

const SynthesisContext = createContext(InitialSynthesisContext);
export const useSynthesisContext = () => useContext(SynthesisContext);

export default function SynthesisProvider({ children }: ChildrenProp) {
    // ????????? ?????? ??????????????? ??????
    const [dialogType, setDialogType] = useState<string | null>(null);
    // ????????? ?????? ????????????
    const [registeringImages, setRegisteringImages] = useState<File[]>([]);
    // ????????? ?????? ????????? ?????????
    const [registeredProductId, setRegisteredProductId] = useState<string>("");
    // input ?????? ??? ????????? URL
    const [registeredImage, setRegisteredImage] = useState<null | File>(null);
    const [registeredImageURL, setRegisteredImageURL] = useState<string | null>(
        null
    );
    const [photo, setPhoto] = useState<null | File>(null);
    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const [video, setVideo] = useState<null | File>(null);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    // ?????? ??????, ?????? ?????? ?????? ?????? ??????
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
    // ?????? ??? ??????
    const [synthesizing, setSynthesizing] = useState<boolean>(false);
    // result ?????? ?????? URL
    const [synthesizedPhotoURL, setSynthesizedPhotoURL] = useState<
        string | null
    >(null);
    const [synthesizedVideoURL, setSynthesizedVideoURL] = useState<
        string | null
    >(null);

    // ?????? ?????? ??????
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
            .post<boolean>(`${API_ENDPOINT}/register`, formData, {
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
                        "?????? ???????????? 1?????? ????????? ???????????????. ????????? ?????? ???????????? ????????? ????????????????????????!"
                    );
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                alert(
                    "???????????????. ?????? ?????? ??? ????????? ??????????????????. ???????????? ????????? ???????????? ????????? ????????? ????????? ?????????????????????."
                );
                return;
            });
        return;
    }

    // input ?????? ????????? : ????????? ?????? ?????????
    function handleRegisteredImageUpload(inputFile: File) {
        setRegisteredImage(inputFile);
        setRegisteredImageURL(URL.createObjectURL(inputFile));
    }

    // input ?????? ????????? : ?????? ?????? ?????????
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

    // ????????? ????????? ??????
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

    // ?????? ????????? ??????
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

    //// ????????? ?????? ??? ?????? ???????????? ???????????? ??????
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

    // ?????? ?????? :
    // (????????? ????????? ????????? ????????? ??????)
    async function requestSynthesize() {
        if (!registeredImage) return;

        setSynthesizing(true);

        const formData = new FormData();
        formData.append("authorized-image", registeredImage);

        // ?????? + ?????? ????????? ??????
        if (photo) {
            formData.append("photo", photo);

            await axios
                .post<File | null>(
                    `${API_ENDPOINT}/synthesis-photo`,
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
                            imageId: JSON.stringify(registeredProductId),
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

        // ?????? + ????????? ????????? ??????
        if (video) {
            formData.append("video", video);

            await axios
                .post<File | null>(
                    `${API_ENDPOINT}/synthesis-video`,
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
                            imageId: JSON.stringify(registeredProductId),
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
        registeredImageURL,
        photo,
        video,
        photoURL,
        videoURL,
        authorizedImageCoord01,
        authorizedImageCoord02,
        imageCoord01,
        imageCoord02,
        synthesizing,
        synthesizedPhotoURL,
        synthesizedVideoURL,
        dialogType,
        setDialogType,
        setRegisteringImages,
        requestImageRegister,
        setRegisteredProductId,
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
