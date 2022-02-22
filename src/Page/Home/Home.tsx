import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HeaderPageContainer, StylelessButton } from "../../StyledComponents";

export default function Home() {
    return (
        <Container>
            <MainBanner>
                <MainBannerImage
                    src={require("../../Resources/img/main-banner.png")}
                />
                <BannerContents>
                    {`드러내세요, 자연스럽게.`}
                    <Link to="synthesis">
                        <ConvertButton>{`합성하기 >`}</ConvertButton>
                    </Link>
                </BannerContents>
            </MainBanner>
            <GuideCardRow>
                <GuideCardBox>
                    <GuideCard>
                        <GuideImg
                            src={require("../../Resources/img/main-guide-icon01.png")}
                        />
                        3D 모델링 시스템
                    </GuideCard>
                    <GuideUL>
                        <GuideLI>• 제품 배송 절차가 필요 없습니다.</GuideLI>
                        <GuideLI>• 제품 정보는 초기 1회만 등록합니다.</GuideLI>
                    </GuideUL>
                </GuideCardBox>
                <GuideCardBox>
                    <GuideCard>
                        <GuideImg
                            src={require("../../Resources/img/main-guide-icon02.png")}
                        />
                        콘텐츠 매칭 시스템
                    </GuideCard>
                    <GuideUL>
                        <GuideLI>• 콘텐츠 선택 시간을 줄여줍니다.</GuideLI>
                        <GuideLI>• 효과적인 타겟팅이 가능합니다.</GuideLI>
                    </GuideUL>
                </GuideCardBox>
                <GuideCardBox>
                    <GuideCard>
                        <GuideImg
                            src={require("../../Resources/img/main-guide-icon03.png")}
                        />
                        광고 합성 시스템
                    </GuideCard>
                    <GuideUL>
                        <GuideLI>• 즉각적으로 광고를 삽입합니다.</GuideLI>
                        <GuideLI>
                            • 클라이언트의 피드백을 빠르게 수용합니다.
                        </GuideLI>
                        <GuideLI>
                            • 결과물을 확인 후, 광고를 결정하세요.
                        </GuideLI>
                    </GuideUL>
                </GuideCardBox>
            </GuideCardRow>
        </Container>
    );
}

const Container = styled(HeaderPageContainer)``;

const MainBanner = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: fit-content;
    font-size: 30px;
    color: white;
    margin: 0px auto;
    margin-bottom: 50px;
`;

const MainBannerImage = styled.img`
    width: 100%;
    height: auto;
`;

const BannerContents = styled.div`
    position: absolute;
    left: 170px;
    bottom: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;

const ConvertButton = styled(StylelessButton)`
    font-size: 21px;
    padding: 16px 28px;
    border: none;
    border-radius: 24px;
    color: white;
    background-color: ${(props) =>
        props.theme.home.synthesisButtonBackgroundColor};
`;

const GuideCardRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    height: fit-content;
    padding: 0px 50px;
    margin: 0px auto;
`;

const GuideCardBox = styled.div`
    display: block;
    width: 31%;
`;

const GuideCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    font-size: 24px;
    color: ${(props) => props.theme.color.guideCardNavy};
    background-color: ${(props) => props.theme.color.guideCardGray};
    padding: 30px;
    margin-bottom: 16px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`;

const GuideImg = styled.img`
    width: 70%;
    height: auto;
`;

const GuideUL = styled.ul`
    margin-left: 1rem;
`;

const GuideLI = styled.li`
    display: list-item;
    font-size: 16px;
    line-height: 32px;
`;
