import React from "react";
import styled from "styled-components";

export default function SynthesisHeader() {
    return (
        <Container>
            <SynthesisTitleImg
                src={require("../../Resources/img/synthesis-icon.png")}
            />
            <SynthesisTitle>광고 제품 합성하기</SynthesisTitle>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 50px;
`;

const SynthesisTitleImg = styled.img`
    height: 100%;
`;

const SynthesisTitle = styled.span`
    font-size: 32px;
`;
