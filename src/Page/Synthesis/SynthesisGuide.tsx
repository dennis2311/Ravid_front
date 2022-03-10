import React from "react";
import styled from "styled-components";

export default function SynthesisGuide() {
    return (
        <Container>
            <GuideCard>
                <GuideCardImgPart>
                    <GuideImg
                        src={require("../../Resources/img/synthesis-guide-icon01.png")}
                    />
                </GuideCardImgPart>
                <GuideCardTextPart>
                    <GuideTextIndex>01.</GuideTextIndex>
                    <GuideText>제품을 등록하세요.</GuideText>
                    <GuideText>
                        제품의 ID와 예시 이미지 5장을 촬영하여 업로드 해야
                        합니다.
                    </GuideText>
                    <GuideText>(제품 별로 초기 1회만 등록)</GuideText>
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
                    <GuideText>
                        등록한 제품의 아이디를 입력하고, 합성할 이미지를
                        선택하세요.
                    </GuideText>
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
                    <GuideText>
                        이미지 및 동영상 내에 합성 위치를 입력합니다.
                    </GuideText>
                    <GuideText>(왼쪽 위, 오른쪽 위)</GuideText>
                </GuideCardTextPart>
            </GuideCard>
            <GuideCard>
                <GuideCardImgPart>
                    <GuideImg
                        src={require("../../Resources/img/synthesis-guide-icon04.png")}
                    />
                </GuideCardImgPart>
                <GuideCardTextPart>
                    <GuideTextIndex>04.</GuideTextIndex>
                    <GuideText>
                        합성된 결과물을 다운로드 하여 확인합니다.
                    </GuideText>
                </GuideCardTextPart>
            </GuideCard>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 70%;
    height: fit-content;
    padding: 0px 50px;
    margin: 0px auto;
`;

const GuideCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 35px;
    width: 24%;
    height: 100%;
    font-size: 24px;
    background-color: #f2f5f8;
    padding: 35px 50px 15px 50px;
    border-radius: 20px;
`;

const GuideCardImgPart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
`;

const GuideImg = styled.img`
    width: 100%;
`;

const GuideCardTextPart = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    aspect-ratio: 1;
`;

const GuideTextIndex = styled.span`
    font-size: 20px;
    line-height: 24px;
    color: ${(props) => props.theme.color.mainLightNavy};
    font-family: "NanumGothic";
    font-weight: bold;
    margin-bottom: 10px;
`;

const GuideText = styled.span`
    font-size: 20px;
    line-height: 24px;
    color: black;
    font-family: "NanumGothic";
`;
