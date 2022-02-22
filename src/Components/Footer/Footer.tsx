import React from "react";
import styled from "styled-components";

export default function Footer() {
    return (
        <Container>
            <LeftFooter>
                <FooterText>Copyright@ RAVID All right reserved.</FooterText>
            </LeftFooter>
            <RightFooter>
                <FooterText>래빗</FooterText>
                <FooterText>충청북도 청주시 상당구 탑동 297 2층</FooterText>
                <FooterText>TEL: 043-288-9136</FooterText>
            </RightFooter>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${(props) => props.theme.footer.height};
    background-color: ${(props) => props.theme.footer.backgroundColor};
    padding: 0px 24px;
    margin-top: 360px;
`;

const LeftFooter = styled.div`
    display: flex;
    flex-direction: column;
`;

const RightFooter = styled(LeftFooter)``;

const FooterText = styled.span`
    font-size: 16px;
    line-height: 21px;
    color: gray;
`;
