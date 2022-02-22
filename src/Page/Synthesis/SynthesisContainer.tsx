import React from "react";
import styled from "styled-components";
import { useSynthesisContext } from "./SynthesisProvider";
import SynthesisGuide from "./SynthesisGuide";
import { HeaderPageContainer } from "../../StyledComponents";

export default function SynthesisContainer() {
    return (
        <Container>
            <Header />
            <Previews />
            <SynthesisGuide />
        </Container>
    );
}

function Header() {
    const { handleFileUpload, requestSynthesize } = useSynthesisContext();
    return (
        <>
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
                    {/* label의 for 속성을 이용해 input 기능을 물려받게 하고 input 태그는 안 보이게 설정 */}
                    <FileSelectButton htmlFor="file">
                        + 변환할 파일 선택
                    </FileSelectButton>
                    <input
                        id="file"
                        type="file"
                        formEncType="multipart/form-data"
                        accept="image/png, video/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            handleFileUpload(e);
                        }}
                    />
                    <button>합성하기</button>
                </FileInputBoxInnerContainer>
            </FileInputBoxOuterContainer>
        </>
    );
}

function Previews() {
    const {
        authorizedImageURL,
        photoURL,
        videoURL,
        synthesizedPhotoURL,
        synthesizedVideoURL,
    } = useSynthesisContext();
    return (
        <PreviewRow
            show={
                authorizedImageURL != null ||
                photoURL != null ||
                videoURL != null
            }
        >
            {synthesizedPhotoURL || synthesizedVideoURL ? (
                <ResultPreview />
            ) : (
                <InputPreview />
            )}
        </PreviewRow>
    );
}

function InputPreview() {
    const {
        authorizedImageURL,
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
                {authorizedImageURL ? (
                    <>
                        <PhotoPreviewContainer>
                            <PhotoPreview
                                src={authorizedImageURL}
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

function ResultPreview() {
    const { synthesizedPhotoURL, synthesizedVideoURL } = useSynthesisContext();

    if (synthesizedPhotoURL) {
        return (
            <SynthesizedResultPreviewContainer>
                <SynthesizedPhotoPreview src={synthesizedPhotoURL} />
            </SynthesizedResultPreviewContainer>
        );
    }

    if (synthesizedVideoURL) {
        return (
            <SynthesizedResultPreviewContainer>
                <SynthesizedVideoPreview src={synthesizedVideoURL} controls />
            </SynthesizedResultPreviewContainer>
        );
    }

    return null;
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

const FileSelectButton = styled.label`
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

const PreviewRow = styled.div<{ show: boolean }>`
    display: ${(props) => (props.show ? "flex" : "none")};
    justify-content: space-around;
    align-items: center;
    width: 70%;
    height: 400px;
    margin: 0px auto;
    margin-bottom: 40px;
`;

const PreviewContainer = styled.div`
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

const SynthesizedResultPreviewContainer = styled(PreviewContainer)`
    width: 80%;
`;

const SynthesizedPhotoPreview = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const SynthesizedVideoPreview = styled.video`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const CoordText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
