import React from "react";
import styled from "styled-components";
import { useSynthesisContext } from "./SynthesisProvider";
import SynthsisPreviewsInput from "./SynthesisPreviews__Input";
import SynthesisPreviewsResult from "./SynthesisPreviews__Result";

export default function SynthesisPreviews() {
    const {
        registeredImageURL,
        photoURL,
        videoURL,
        synthesizedPhotoURL,
        synthesizedVideoURL,
    } = useSynthesisContext();

    if (!registeredImageURL && !photoURL && !videoURL) return null;

    return (
        <Container>
            {synthesizedPhotoURL || synthesizedVideoURL ? (
                <SynthesisPreviewsResult />
            ) : (
                <SynthsisPreviewsInput />
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    height: 400px;
    margin: 0px auto;
    margin-bottom: 40px;
`;
