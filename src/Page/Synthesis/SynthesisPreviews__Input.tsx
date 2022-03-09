import React from "react";
import styled from "styled-components";
import { useSynthesisContext } from "./SynthesisProvider";

export default function SynthsisPreviewsInput() {
    const {
        registeredImageURL,
        photoURL,
        videoURL,
        authorizedImageCoord01,
        authorizedImageCoord02,
        imageCoord01,
        imageCoord02,
        handleAuthorizedImageClick,
        handleImageClick,
    } = useSynthesisContext();

    return (
        <>
            <PreviewContainer>
                {registeredImageURL ? (
                    <>
                        <PhotoPreviewContainer>
                            <PhotoPreview
                                src={registeredImageURL}
                                onClick={handleAuthorizedImageClick}
                            />
                        </PhotoPreviewContainer>
                        <CoordText>{`선택 좌표: ${authorizedImageCoord01}`}</CoordText>
                        <CoordText>{`선택 좌표: ${authorizedImageCoord02}`}</CoordText>
                    </>
                ) : (
                    `제품 사진 업로드 필요`
                )}
            </PreviewContainer>
            <PreviewContainer>
                {photoURL && (
                    <>
                        <PhotoPreviewContainer>
                            <PhotoPreview
                                src={photoURL}
                                onClick={handleImageClick}
                            />
                        </PhotoPreviewContainer>
                        <CoordText>{`선택 좌표: ${imageCoord01}`}</CoordText>
                        <CoordText>{`선택 좌표: ${imageCoord02}`}</CoordText>
                    </>
                )}
                {videoURL && <VideoPreview src={videoURL} controls />}
                {!photoURL && !videoURL && `사진/동영상 업로드 필요`}
            </PreviewContainer>
        </>
    );
}

export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    width: 32%;
    height: 100%;
    font-size: 24px;
    color: white;
    background-color: gray;
    padding: 15px;
    border-radius: 15px;
    overflow: hidden;
`;

const PhotoPreviewContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;
    overflow: hidden;
`;

const PhotoPreview = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const VideoPreview = styled.video`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const CoordText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
