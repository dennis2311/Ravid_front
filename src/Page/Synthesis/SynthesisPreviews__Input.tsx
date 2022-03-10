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
        synthesizing,
        handleAuthorizedImageClick,
        handleImageClick,
    } = useSynthesisContext();

    return (
        <>
            <Container>
                {registeredImageURL ? (
                    <>
                        <PreviewContainer>
                            <PhotoPreview
                                src={registeredImageURL}
                                onClick={handleAuthorizedImageClick}
                            />
                        </PreviewContainer>
                        <CoordText>{`선택 좌표: ${authorizedImageCoord01}`}</CoordText>
                        <CoordText>{`선택 좌표: ${authorizedImageCoord02}`}</CoordText>
                    </>
                ) : (
                    `제품 사진 업로드 필요`
                )}
            </Container>
            {synthesizing && (
                <SynthesizingInfoText>합성 중입니다</SynthesizingInfoText>
            )}
            <Container>
                {photoURL && (
                    <>
                        <PreviewContainer>
                            <PhotoPreview
                                src={photoURL}
                                onClick={handleImageClick}
                            />
                        </PreviewContainer>
                        <CoordText>{`선택 좌표: ${imageCoord01}`}</CoordText>
                        <CoordText>{`선택 좌표: ${imageCoord02}`}</CoordText>
                    </>
                )}
                {videoURL && (
                    <>
                        <PreviewContainer>
                            <VideoPreview
                                src={videoURL}
                                onClick={handleImageClick}
                            />
                        </PreviewContainer>
                        <CoordText>{`선택 좌표: ${imageCoord01}`}</CoordText>
                        <CoordText>{`선택 좌표: ${imageCoord02}`}</CoordText>
                    </>
                )}
                {!photoURL && !videoURL && `사진/동영상 업로드 필요`}
            </Container>
        </>
    );
}

export const Container = styled.div`
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

const SynthesizingInfoText = styled.span`
    font-family: "NexonGothicBold";
`;

const PreviewContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;
`;

const PhotoPreview = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
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
