import React, { useState } from "react";
import styled from "styled-components";
import { StylelessButton } from "../../../StyledComponents";
import { useSynthesisContext } from "../SynthesisProvider";

export default function SynthesisDialogRegistration() {
    const {
        dialogType,
        registeringImages,
        setDialogType,
        setRegisteringImages,
        requestImageRegister,
    } = useSynthesisContext();
    const [productIdInput, setProductIdInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");

    if (dialogType !== "registration") return null;

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
            <ProductIdInput
                value={productIdInput}
                onChange={(e) => {
                    setProductIdInput(e.target.value);
                }}
            />
            <EmailTagText>등록 여부를 전송 받기 위한 이메일 주소</EmailTagText>
            <EmailInput
                type="email"
                value={emailInput}
                onChange={(e) => {
                    setEmailInput(e.target.value);
                }}
            />
            <ImageUploadRow>
                <ImageUploadContainer>
                    <ImageUploadInputLabel htmlFor="product-image">
                        제품 이미지 업로드
                    </ImageUploadInputLabel>
                    <input
                        id="product-image"
                        type="file"
                        formEncType="multipart/form-data"
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => {
                            if (!e.target.files) return;
                            if (e.target.files.length !== 5) {
                                alert("5장의 이미지를 등록해주세요");
                                return;
                            }
                            const registeringFile: File[] = [];
                            registeringFile.push(e.target.files[0]);
                            registeringFile.push(e.target.files[1]);
                            registeringFile.push(e.target.files[2]);
                            registeringFile.push(e.target.files[3]);
                            registeringFile.push(e.target.files[4]);
                            setRegisteringImages(registeringFile);
                        }}
                    />
                    <UploadedImageListContainer>
                        {registeringImages.map((img, index) => {
                            return (
                                <UploadedImageTitle
                                    key={`${index}:${img.name}`}
                                >
                                    {img.name}
                                </UploadedImageTitle>
                            );
                        })}
                    </UploadedImageListContainer>
                </ImageUploadContainer>
                <ImageUploadGuideContainer>
                    <ImageUploadGuideText>
                        이미지 촬영 가이드 (총 5장)
                    </ImageUploadGuideText>
                    <ImageUploadGuideImg
                        src={require("../../../Resources/img/product-register-guide-icon.png")}
                    />
                </ImageUploadGuideContainer>
            </ImageUploadRow>
            <RegisterButtonRow>
                <RegisterButton
                    disabled={
                        !productIdInput ||
                        !emailInput ||
                        !registeringImages.length
                    }
                    onClick={() => {
                        requestImageRegister({
                            id: productIdInput,
                            email: emailInput,
                        });
                    }}
                >
                    제품 등록
                </RegisterButton>
            </RegisterButtonRow>
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
`;

const DialogCloseIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-bottom: 18px;
    cursor: pointer;
`;

const ProductIdInput = styled.input`
    height: 40px;
    margin-bottom: 40px;
    padding: 0px 12px;
    border: 1px solid #d9d9d9;
`;

const EmailTagText = styled(ProductIdTagText)`
    margin-bottom: 12px;
`;

const EmailInput = styled(ProductIdInput)``;

const ImageUploadRow = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 40px;
`;

const ImageUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 40%;
`;

const ImageUploadInputLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #3a3838;
    background-color: #d9d9d9;
    padding: 12px;
    cursor: pointer;
`;

const UploadedImageListContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid #d9d9d9;
    overflow-y: auto;
`;

const UploadedImageTitle = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    border: 1px solid #d9d9d9;
`;

const ImageUploadGuideContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 60%;
    padding: 15px;
    background-color: white;
    border-radius: 15px;
`;

const ImageUploadGuideText = styled.span`
    color: black;
`;

const ImageUploadGuideImg = styled.img`
    width: 100%;
`;

const RegisterButtonRow = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const RegisterButton = styled(StylelessButton)`
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
