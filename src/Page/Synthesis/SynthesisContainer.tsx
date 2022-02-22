import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSynthesisContext } from "./SynthesisProvider";
import SynthesisGuide from "./SynthesisGuide";
import { HeaderPageContainer } from "../../StyledComponents";

export default function SynthesisContainer() {
    const [photoURL, setPhotoURL] = useState<string | undefined>(undefined);
    const [videoURL, setVideoURL] = useState<string | undefined>(undefined);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { photo, video, uploadPhoto, uploadVideo, requestSynthesize } =
        useSynthesisContext();

    return (
        <Container>
            <SynthesisTitleRow>
                <SynthesisTitleImg
                    src={require("../../Resources/img/synthesis-icon.png")}
                />
                <SynthesisTitle>광고 제품 합성하기</SynthesisTitle>
            </SynthesisTitleRow>
            <FileInputBoxOuterContainer>
                <FileInputBoxInnerContainer
                    onSubmit={(e) => {
                        e.preventDefault();
                        requestSynthesize();
                    }}
                >
                    <FileInputImg
                        src={require("../../Resources/img/file-icon.png")}
                    />
                    <FileInputHorizontalLine />
                    <FileSelectButton>+ 변환할 파일 선택</FileSelectButton>
                </FileInputBoxInnerContainer>
            </FileInputBoxOuterContainer>
            <SynthesisGuide />
        </Container>
    );
}

const Container = styled(HeaderPageContainer)``;

const SynthesisTitleRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 50px;
`;

const SynthesisTitleImg = styled.img`
    height: 100%;
`;

const SynthesisTitle = styled.span`
    font-size: 32px;
`;

const FileInputBoxOuterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 400px;
    background-color: ${(props) => props.theme.color.mainDarkNavy};
    padding: 35px;
    margin: 0px auto;
    margin-bottom: 50px;
    border-radius: 30px;
`;

const FileInputBoxInnerContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 36px;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.mainLightNavy};
    border-radius: 40px;
    border: 2px dotted white;
`;

const FileInputImg = styled.img`
    height: 25%;
`;

const FileInputHorizontalLine = styled.div`
    width: 64%;
    height: 2px;
    background-color: white;
    margin-bottom: 10px;
`;

const FileSelectButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 70px;
    font-size: 21px;
    color: gray;
    background-color: white;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    cursor: pointer;
`;

// {photo ? (
//     <PhotoPreview src={photoURL} />
// ) : (
//     <input
//         type="file"
//         formEncType="multipart/form-data"
//         onChange={(e) => {
//             if (e.target.files) {
//                 uploadPhoto(e.target.files[0]);
//                 setPhotoURL(
//                     URL.createObjectURL(e.target.files[0])
//                 );
//             }
//         }}
//     />
// )}
// <VideoPreview ref={videoRef} controls />
// <input
//     type="file"
//     formEncType="multipart/form-data"
//     onChange={(e) => {
//         if (e.target.files && videoRef.current) {
//             uploadVideo(e.target.files[0]);
//             videoRef.current.src = URL.createObjectURL(
//                 e.target.files[0]
//             );
//         }
//     }}
// />
// {/* {video ? (
//     <VideoPreview ref={videoRef} />
// ) : (
//     <input
//         type="file"
//         formEncType="multipart/form-data"
//         onChange={(e) => {
//             if (e.target.files && videoRef.current) {
//                 uploadVideo(e.target.files[0]);
//                 videoRef.current.srcObject =
//                     e.target.files[0];
//             }
//         }}
//     />
// )} */}

const FileInputFormRow = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85%;
    height: 360px;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
`;

const FileInputRow = styled.div`
    display: flex;
    justify-content: center;
`;

const PhotoPreview = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    border: 2px solid black;
`;

const VideoPreview = styled.video`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    max-height: 400px;
    border: 2px solid black;
`;
