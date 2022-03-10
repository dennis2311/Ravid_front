import React from "react";
import styled from "styled-components";
import { useSynthesisContext } from "./SynthesisProvider";
import { Container } from "./SynthesisPreviews__Input";

export default function SynthesisPreviewsResult() {
    const { synthesizedPhotoURL, synthesizedVideoURL } = useSynthesisContext();

    if (synthesizedPhotoURL) {
        return (
            <SynthesizedResultPreviewContainer>
                <SynthesizedPhotoPreview src={synthesizedPhotoURL} />
                <a href={synthesizedPhotoURL} download="synthesized-img">
                    <button>사진 다운로드</button>
                </a>
            </SynthesizedResultPreviewContainer>
        );
    }

    if (synthesizedVideoURL) {
        return (
            <SynthesizedResultPreviewContainer>
                <SynthesizedVideoPreview src={synthesizedVideoURL} controls />
                <a href={synthesizedVideoURL} download="synthesized-vid">
                    <button>동영상 다운로드</button>
                </a>
            </SynthesizedResultPreviewContainer>
        );
    }

    return null;
}

const SynthesizedResultPreviewContainer = styled(Container)`
    width: 80%;
    padding: 15px;
`;

const SynthesizedPhotoPreview = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;
`;

const SynthesizedVideoPreview = styled.video`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
