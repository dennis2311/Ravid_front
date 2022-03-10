import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSynthesisContext } from "../SynthesisProvider";
import { StylelessButton } from "../../../StyledComponents";

export default function SynthesisDialogUpload() {
    const {
        dialogType,
        handleRegisteredImageUpload,
        handleFileUpload,
        setDialogType,
    } = useSynthesisContext();
    const [productIdInput, setProductIdInput] = useState<string>("");
    const [registeredImage00, setRegisteredImage00] = useState<File | null>(
        null
    );
    const [registeredImage01, setRegisteredImage01] = useState<File | null>(
        null
    );
    const [registeredImage02, setRegisteredImage02] = useState<File | null>(
        null
    );
    const [registeredImage03, setRegisteredImage03] = useState<File | null>(
        null
    );
    const [registeredImage04, setRegisteredImage04] = useState<File | null>(
        null
    );
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [sourceFile, setSourceFile] = useState<File | null>(null);

    function selectImage(image: File) {
        setSelectedImage(image);
    }

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
                <ProductIdInput
                    value={productIdInput}
                    onChange={(e) => {
                        setProductIdInput(e.target.value);
                    }}
                />
                <GetRegisteredImagesButton
                    onClick={async () => {
                        if (!productIdInput) {
                            alert("제품 id를 입력해주세요");
                            return;
                        }
                        axios
                            .get<File | null>(
                                `http://localhost:5000/registered-image?product-id=${productIdInput}&product-index=0`,
                                {
                                    responseType: "blob",
                                }
                            )
                            .then((res) => {
                                if (res.data) {
                                    setRegisteredImage00(res.data);
                                }
                            });
                        axios
                            .get<File | null>(
                                `http://localhost:5000/registered-image?product-id=${productIdInput}&product-index=1`,
                                {
                                    responseType: "blob",
                                }
                            )
                            .then((res) => {
                                if (res.data) {
                                    setRegisteredImage01(res.data);
                                }
                            });
                        axios
                            .get<File | null>(
                                `http://localhost:5000/registered-image?product-id=${productIdInput}&product-index=2`,
                                {
                                    responseType: "blob",
                                }
                            )
                            .then((res) => {
                                if (res.data) {
                                    setRegisteredImage02(res.data);
                                }
                            });
                        axios
                            .get<File | null>(
                                `http://localhost:5000/registered-image?product-id=${productIdInput}&product-index=3`,
                                {
                                    responseType: "blob",
                                }
                            )
                            .then((res) => {
                                if (res.data) {
                                    setRegisteredImage03(res.data);
                                }
                            });
                        axios
                            .get<File | null>(
                                `http://localhost:5000/registered-image?product-id=${productIdInput}&product-index=4`,
                                {
                                    responseType: "blob",
                                }
                            )
                            .then((res) => {
                                if (res.data) {
                                    setRegisteredImage04(res.data);
                                }
                            });
                    }}
                >
                    이미지 확인
                </GetRegisteredImagesButton>
            </ProductIdInputRow>
            <RegisteredImagesPreviewRow>
                {registeredImage00 && (
                    <RegisteredImage
                        src={URL.createObjectURL(registeredImage00)}
                        selected={selectedImage === registeredImage00}
                        onClick={() => {
                            selectImage(registeredImage00);
                        }}
                    />
                )}
                {registeredImage01 && (
                    <RegisteredImage
                        src={URL.createObjectURL(registeredImage01)}
                        selected={selectedImage === registeredImage01}
                        onClick={() => {
                            selectImage(registeredImage01);
                        }}
                    />
                )}
                {registeredImage02 && (
                    <RegisteredImage
                        src={URL.createObjectURL(registeredImage02)}
                        selected={selectedImage === registeredImage02}
                        onClick={() => {
                            selectImage(registeredImage02);
                        }}
                    />
                )}
                {registeredImage03 && (
                    <RegisteredImage
                        src={URL.createObjectURL(registeredImage03)}
                        selected={selectedImage === registeredImage03}
                        onClick={() => {
                            selectImage(registeredImage03);
                        }}
                    />
                )}
                {registeredImage04 && (
                    <RegisteredImage
                        src={URL.createObjectURL(registeredImage04)}
                        selected={selectedImage === registeredImage04}
                        onClick={() => {
                            selectImage(registeredImage04);
                        }}
                    />
                )}
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
                    disabled={!selectedImage || !sourceFile}
                    onClick={() => {
                        if (selectedImage) {
                            handleRegisteredImageUpload(selectedImage);
                        }
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
    flex-wrap: nowrap;
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 60%;
    overflow: hidden;
    border: 1px solid black;
`;

const RegisteredImage = styled.img<{ selected: boolean }>`
    height: 100%;
    border: ${(props) =>
        props.selected ? `3px solid blue` : `1px solid black`};
    cursor: pointer;
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
