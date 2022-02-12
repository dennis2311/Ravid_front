import React, { useState, useRef } from "react";
import { useSynthesisContext } from "./SynthesisProvider";
import {
    Container,
    SynthesisPageTitle,
    FileInputFormRow,
    FileInputRow,
    PhotoPreview,
    VideoPreview,
    GuidesRow,
    GuideCard,
} from "./SynthesisStyledComponents";

export default function SynthesisContainer() {
    const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);
    const [videoURL, setVideoURL] = useState<string | undefined>(undefined);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { photo, video, uploadPhoto, uploadVideo, requestSynthesize } =
        useSynthesisContext();

    return (
        <Container>
            <SynthesisPageTitle>{`합성하기`}</SynthesisPageTitle>
            <FileInputFormRow
                onSubmit={(e) => {
                    e.preventDefault();
                    requestSynthesize();
                }}
            >
                <FileInputRow>
                    {photo ? (
                        <PhotoPreview src={photoURL} />
                    ) : (
                        <input
                            type="file"
                            formEncType="multipart/form-data"
                            onChange={(e) => {
                                if (e.target.files) {
                                    uploadPhoto(e.target.files[0]);
                                    setPhotoURL(
                                        URL.createObjectURL(e.target.files[0])
                                    );
                                }
                            }}
                        />
                    )}
                    <VideoPreview ref={videoRef} controls />
                    <input
                        type="file"
                        formEncType="multipart/form-data"
                        onChange={(e) => {
                            if (e.target.files && videoRef.current) {
                                uploadVideo(e.target.files[0]);
                                videoRef.current.src = URL.createObjectURL(
                                    e.target.files[0]
                                );
                            }
                        }}
                    />
                    {/* {video ? (
                        <VideoPreview ref={videoRef} />
                    ) : (
                        <input
                            type="file"
                            formEncType="multipart/form-data"
                            onChange={(e) => {
                                if (e.target.files && videoRef.current) {
                                    uploadVideo(e.target.files[0]);
                                    videoRef.current.srcObject =
                                        e.target.files[0];
                                }
                            }}
                        />
                    )} */}
                </FileInputRow>
                <button>변환하기</button>
            </FileInputFormRow>
            <GuidesRow>
                <GuideCard></GuideCard>
                <GuideCard></GuideCard>
            </GuidesRow>
        </Container>
    );
}
