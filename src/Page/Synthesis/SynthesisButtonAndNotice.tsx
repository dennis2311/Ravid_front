import React from "react";
import styled from "styled-components";

export default function SynthesisButtonAndNotice() {
    return (
        <Container>
            <RequestContactMessageContainer>
                <RequestContactMessage>
                    현재의 기능은 이미지 또는 카메라가 정지된 동영상에서
                    동작합니다.
                </RequestContactMessage>
                <RequestContactMessage>
                    더 자연스러운 합성을 원하시면, ship9136@naver.com로 연락
                    부탁드립니다.
                </RequestContactMessage>
            </RequestContactMessageContainer>
            <SubmitButton type="submit" form="synthesis">
                합성하기
            </SubmitButton>
            <RequestContactMessageContainer />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 70%;
    height: 80px;
    padding: 0px 12px;
    margin: 0px auto;
    margin-bottom: 50px;
`;

const SubmitButton = styled.button`
    padding: 10px 24px;
    font-family: "NanumGothic";
    font-weight: bold;
`;

const RequestContactMessageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    width: 40%;
`;

const RequestContactMessage = styled.span`
    line-height: 20px;
    font-family: "NanumGothic";
`;
