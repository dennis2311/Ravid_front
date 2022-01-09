import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    MainBanner,
    ConvertButtonRow,
    ConvertButton,
} from "./HomeStyledComponents";

export default function HomeContainer() {
    return (
        <Container>
            <MainBanner>
                {`RAVID와 함께 쉽고 빠르게 가상 광고를 만드세요`}
            </MainBanner>
            <ConvertButtonRow>
                <Link to="conversion">
                    <ConvertButton>{`합성하기 >`}</ConvertButton>
                </Link>
            </ConvertButtonRow>
        </Container>
    );
}
