import React from "react";
import styled from "styled-components";

export default function SynthesisGuide() {
    return (
        <GuideCardRow>
            <GuideCard>
                <GuideCardImgPart>
                    <GuideImg
                        src={require("../../Resources/img/synthesis-guide-icon01.png")}
                    />
                </GuideCardImgPart>
                <GuideCardTextPart>
                    <GuideTextIndex>01.</GuideTextIndex>
                    <GuideText>광고하려는 제품의</GuideText>
                    <GuideText>이미지를 업로드합니다.</GuideText>
                </GuideCardTextPart>
            </GuideCard>
            <GuideCard>
                <GuideCardImgPart>
                    <GuideImg
                        src={require("../../Resources/img/synthesis-guide-icon02.png")}
                    />
                </GuideCardImgPart>
                <GuideCardTextPart>
                    <GuideTextIndex>02.</GuideTextIndex>
                    <GuideText>동영상 내에</GuideText>
                    <GuideText>합성 위치를 입력합니다.</GuideText>
                </GuideCardTextPart>
            </GuideCard>
            <GuideCard>
                <GuideCardImgPart>
                    <GuideImg
                        src={require("../../Resources/img/synthesis-guide-icon03.png")}
                    />
                </GuideCardImgPart>
                <GuideCardTextPart>
                    <GuideTextIndex>03.</GuideTextIndex>
                    <GuideText>합성된 동영상을</GuideText>
                    <GuideText>다운로드 합니다.</GuideText>
                </GuideCardTextPart>
            </GuideCard>
        </GuideCardRow>
    );
}

const GuideCardRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    height: fit-content;
    padding: 0px 50px;
    margin: 0px auto;
`;

const GuideCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    width: 31%;
    aspect-ratio: 1.3;
    font-size: 24px;
    background-color: ${(props) => props.theme.color.guideCardGray};
    padding: 35px 50px;
    border-radius: 20px;
`;

const GuideCardImgPart = styled.div`
    display: flex;
    height: 40%;
`;

const GuideImg = styled.img`
    height: 80%;
`;

const GuideCardTextPart = styled(GuideCardImgPart)`
    flex-direction: column;
    justify-content: flex-end;
`;

const GuideTextIndex = styled.span`
    font-size: 20px;
    line-height: 24px;
    color: ${(props) => props.theme.color.mainLightNavy};
`;

const GuideText = styled(GuideTextIndex)`
    color: black;
`;
