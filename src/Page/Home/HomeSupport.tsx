import React from "react";
import styled from "styled-components";

export default function HomeSupport() {
    return (
        <Container>
            <SupportBannerImage
                src={require("../../Resources/img/support-banner.png")}
            />
            <BannerContentsContainer>
                <BannerTextGhostButton>Inquiry</BannerTextGhostButton>
                <BannerTitleTextContainer>
                    <BannerTitleText>서비스 이용에</BannerTitleText>
                    <BannerTitleText>불편한 점이 있으신가요?</BannerTitleText>
                </BannerTitleTextContainer>
                <BannerContentTextContainer>
                    <BannerContentText>
                        찾아오는 곳: 충청북도 청주시 상당구 탑동 297 208호
                    </BannerContentText>
                    <BannerContentText>
                        연락처: ship9136@naver.com
                    </BannerContentText>
                </BannerContentTextContainer>
            </BannerContentsContainer>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: fit-content;
    color: white;
    margin: 0px auto;
    margin-bottom: 50px;
`;

const SupportBannerImage = styled.img`
    width: 100%;
    height: auto;
`;

const BannerContentsContainer = styled.div`
    position: absolute;
    bottom: 15%;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 80px;
`;

const BannerTextGhostButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    color: #00518e;
    padding: 12px 25px;
    margin-bottom: 28px;
    border: 2.5px solid #00518e;
    border-radius: 32px;
`;

const BannerTitleTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
`;

const BannerTitleText = styled.span`
    font-size: 40px;
    line-height: 54px;
    color: black;
`;

const BannerContentTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const BannerContentText = styled.span`
    font-size: 16px;
    line-height: 21px;
    color: black;
`;
