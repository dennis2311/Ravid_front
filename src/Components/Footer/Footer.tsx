import React from "react";
import styled from "styled-components";

export default function Footer() {
    return (
        <Container>
            <FooterIconContainer>
                <FooterIconImg
                    src={require("../../Resources/img/ravid-icon.png")}
                />
                <FooterIconText>RAVID</FooterIconText>
            </FooterIconContainer>
            <FooterText>래빗</FooterText>
            <FooterText>충청북도 청주시 상당구 탑동 297 2층</FooterText>
            <FooterText>문의: ship9136@naver.com</FooterText>
            <FooterText>Copyright@ RAVID All right reserved.</FooterText>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.footer.backgroundColor};
    padding: 60px 160px;
    margin-top: 360px;
`;

const FooterIconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 50px;
    margin-bottom: 20px;
`;

const FooterIconImg = styled.img`
    height: 100%;
`;

const FooterIconText = styled.span`
    font-size: 24px;
    color: ${(props) => props.theme.color.iconBlue};
`;

const FooterText = styled.span`
    font-size: 16px;
    line-height: 30px;
    color: gray;
`;
