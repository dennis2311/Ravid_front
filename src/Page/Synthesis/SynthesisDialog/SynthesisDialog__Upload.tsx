import React, { useState } from "react";
import styled from "styled-components";
import { useSynthesisContext } from "../SynthesisProvider";
import { StylelessButton } from "../../../StyledComponents";

export default function SynthesisDialogUpload() {
    const { dialogType, handleFileUpload, setDialogType } =
        useSynthesisContext();
    const [sourceFile, setSourceFile] = useState<File | null>(null);

    if (dialogType !== "upload") return null;

    return (
        <Container>
            <ProductIdTagTextRow>
                <ProductIdTagText>제품 아이디</ProductIdTagText>
                <DialogCloseIcon
                    onClick={() => {
                        setDialogType(null);
                    }}
                >
                    X
                </DialogCloseIcon>
            </ProductIdTagTextRow>
            <ProductIdInputRow>
                <ProductIdInput />
                <GetRegisteredImagesButton>
                    이미지 확인
                </GetRegisteredImagesButton>
            </ProductIdInputRow>

            <RegisteredImagesPreviewRow>
                <RegisteredImageContainer>
                    <RegisteredImage />
                </RegisteredImageContainer>
            </RegisteredImagesPreviewRow>

            <UploadSynthesisSourceRow>
                <UploadSynthesisSourceRowTagText>
                    합성 소스 불러오기 (이미지 또는 동영상)
                </UploadSynthesisSourceRowTagText>
                <UploadSynthesisSourceLabel htmlFor="synthesis-source">
                    불러오기...
                </UploadSynthesisSourceLabel>
                <input
                    id="synthesis-source"
                    type="file"
                    formEncType="multipart/form-data"
                    accept="image/* video/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        if (e.target.files) {
                            setSourceFile(e.target.files[0]);
                        }
                    }}
                />
            </UploadSynthesisSourceRow>
            <UploadedSynthesisSourceTitle>
                {sourceFile?.name}
            </UploadedSynthesisSourceTitle>
            <UploadButtonRow>
                <UploadButton
                    disabled={!sourceFile}
                    onClick={() => {
                        if (sourceFile) {
                            handleFileUpload(sourceFile);
                        }
                        setDialogType(null);
                    }}
                >
                    선택 완료
                </UploadButton>
            </UploadButtonRow>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 90px;
    display: flex;
    flex-direction: column;
    width: 600px;
    background-color: #f5f6f7;
    padding: 30px;
    border: 2px solid gray;
    border-radius: 30px;
    z-index: 100;
    * {
        font-family: "NanumGothic";
        font-weight: bold;
    }
`;

const ProductIdTagTextRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin-bottom: 12px;
`;

const ProductIdTagText = styled.span`
    font-size: 21px;
    color: #3a3838;
    margin-bottom: 8px;
`;

const DialogCloseIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-bottom: 18px;
    cursor: pointer;
`;

const ProductIdInputRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
`;

const ProductIdInput = styled.input`
    width: 100%;
    height: 100%;
    color: #3a3838;
    background-color: white;
    padding: 0px 12px;
    border: 1px solid #d9d9d9;
`;

const GetRegisteredImagesButton = styled(StylelessButton)`
    width: 180px;
    height: 100%;
    font-size: 16px;
    color: #3a3838;
    background-color: #d9d9d9;
`;

const RegisteredImagesPreviewRow = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    height: 200px;
    background-color: white;
    padding: 15px;
    margin-bottom: 40px;
    border: 1px solid #d9d9d9;
    overflow-x: auto;
`;

const RegisteredImageContainer = styled.div`
    height: 100%;
    width: fit-content;
`;

const RegisteredImage = styled.img`
    height: 100%;
`;

const UploadSynthesisSourceRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const UploadSynthesisSourceRowTagText = styled.span`
    font-size: 21px;
    color: #3a3838;
`;

const UploadSynthesisSourceLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 125px;
    font-size: 16px;
    color: #3a3838;
    background-color: #d9d9d9;
    padding: 15px;
    cursor: pointer;
`;

const UploadedSynthesisSourceTitle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: white;
    padding: 12px;
    margin-bottom: 30px;
    border: 1px solid #d9d9d9;
`;

const UploadButtonRow = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const UploadButton = styled(StylelessButton)`
    padding: 18px 40px;
    font-size: 24px;
    color: white;
    background-color: #3b3838;
    border-radius: 32px;
    :disabled {
        color: #3b3838;
        background-color: gray;
        cursor: auto;
    }
`;
