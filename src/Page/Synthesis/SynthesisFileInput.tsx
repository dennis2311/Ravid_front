import React from "react";
import styled from "styled-components";
import { useSynthesisContext } from "./SynthesisProvider";
import SynthesisDialogRegistration from "./SynthesisDialog/SynthesisDialog__Registration";
import SynthesisDialogUpload from "./SynthesisDialog/SynthesisDialog__Upload";

export default function SynthesisFileInput() {
    const { dialogType, requestSynthesize, setDialogType } =
        useSynthesisContext();

    return (
        <Container>
            <InnerContainer
                id="synthesis"
                onSubmit={(e) => {
                    e.preventDefault();
                    requestSynthesize();
                }}
            >
                <FileInputImg
                    src={require("../../Resources/img/file-icon.png")}
                />
                <FileInputHorizontalLine />
                <FileSelectButtonsRow>
                    <FileSelectButton
                        onClick={() => {
                            setDialogType(
                                dialogType === "registration"
                                    ? null
                                    : "registration"
                            );
                        }}
                    >
                        제품 등록
                    </FileSelectButton>
                    <FileSelectButton
                        onClick={() => {
                            setDialogType(
                                dialogType === "upload" ? null : "upload"
                            );
                        }}
                    >
                        + 합성 소스 선택
                    </FileSelectButton>
                    <SynthesisDialogRegistration />
                    <SynthesisDialogUpload />
                </FileSelectButtonsRow>
            </InnerContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 400px;
    background-color: ${(props) => props.theme.color.mainDarkNavy};
    padding: 35px;
    margin: 0px auto;
    margin-bottom: 18px;
    border-radius: 30px;
`;

const InnerContainer = styled.form`
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

const FileSelectButtonsRow = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
`;

const FileSelectButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 70px;
    font-size: 21px;
    color: #3a3838;
    background-color: white;
    border-radius: 30px;
    font-family: "NanumGothic";
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    cursor: pointer;
`;
