import React from "react";
import styled from "styled-components";

export default function HomeGuide() {
    return (
        <>
            <GuideTextRow>
                <GuideTextGhostButton>
                    Advantage of service
                </GuideTextGhostButton>
                <GuideText>RAVID의 가상 광고가 뛰어난 이유</GuideText>
            </GuideTextRow>
            <GuideImgsRow>
                <GuideImgContainer>
                    <GuideImg
                        src={require("../../Resources/img/main-guide-icon01.png")}
                    />
                    <GuideImgContentContainer>
                        <GuideImgContentNumberLineContainer>
                            01
                            <GuideImgContentHorizontalLine />
                        </GuideImgContentNumberLineContainer>
                        <GuideImgTextContainer>
                            <GuideImgText>단 1회의 제품 등록</GuideImgText>
                        </GuideImgTextContainer>
                    </GuideImgContentContainer>
                </GuideImgContainer>
                <GuideImgContainer>
                    <GuideImg
                        src={require("../../Resources/img/main-guide-icon02.png")}
                    />
                    <GuideImgContentContainer>
                        <GuideImgContentNumberLineContainer>
                            02
                            <GuideImgContentHorizontalLine />
                        </GuideImgContentNumberLineContainer>
                        <GuideImgTextContainer>
                            <GuideImgText>모든 이미지 또는</GuideImgText>
                            <GuideImgText>정지 영상에 합성 가능</GuideImgText>
                        </GuideImgTextContainer>
                    </GuideImgContentContainer>
                </GuideImgContainer>
                <GuideImgContainer>
                    <GuideImg
                        src={require("../../Resources/img/main-guide-icon03.png")}
                    />
                    <GuideImgContentContainer>
                        <GuideImgContentNumberLineContainer>
                            03
                            <GuideImgContentHorizontalLine />
                        </GuideImgContentNumberLineContainer>
                        <GuideImgTextContainer>
                            <GuideImgText> 빠른 광고 합성물 확인</GuideImgText>
                        </GuideImgTextContainer>
                    </GuideImgContentContainer>
                </GuideImgContainer>
            </GuideImgsRow>
        </>
    );
}

const GuideTextRow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;
`;

const GuideTextGhostButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #00518e;
    padding: 15px 25px;
    border: 2px solid #00518e;
    border-radius: 32px;
    font-family: "NanumGothic";
    font-weight: bold;
`;

const GuideText = styled.span`
    font-size: 32px;
    font-family: "NexonGothicBold";
`;

const GuideImgsRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: fit-content;
    padding: 0px 70px;
    margin: 0px auto;
    margin-bottom: 240px;
`;

const GuideImgContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    aspect-ratio: 1;
`;

const GuideImg = styled.img`
    width: 100%;
`;

const GuideImgContentContainer = styled.div`
    position: absolute;
    top: 40%;
    right: 0px;
    display: flex;
    flex-direction: column;
    width: 90%;
    color: white;
`;

const GuideImgContentNumberLineContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
    font-family: "NanumGothic";
    font-weight: bold;
`;

const GuideImgContentHorizontalLine = styled.div`
    width: 100%;
    height: 2px;
    background-color: white;
`;

const GuideImgTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: 15px;
`;

const GuideImgText = styled.span`
    line-height: 20px;
    font-family: "NanumGothic";
    font-weight: bold;
`;
