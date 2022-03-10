import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { StylelessButton } from "../../StyledComponents";

export default function HomeBanner() {
    return (
        <Container>
            <MainBannerImage
                src={require("../../Resources/img/main-banner.png")}
            />
            <BannerContentsContainer>
                제품을 자연스럽게 합성하세요
                <Link to="synthesis">
                    <LinkToSynthesisButton>{`합성하기 >`}</LinkToSynthesisButton>
                </Link>
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
    font-size: 30px;
    color: white;
    margin: 0px auto;
    margin-bottom: 140px;
`;

const MainBannerImage = styled.img`
    width: 100%;
    height: auto;
`;

const BannerContentsContainer = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    font-family: "NanumGothicExtraBold";
    font-weight: bold;
`;

const LinkToSynthesisButton = styled(StylelessButton)`
    font-size: 18px;
    padding: 16px 28px;
    border: none;
    border-radius: 24px;
    color: white;
    background-color: black;
    font-family: "NanumGothicExtraBold";
    font-weight: bold;
`;
