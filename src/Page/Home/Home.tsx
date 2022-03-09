import React from "react";
import styled from "styled-components";
import HomeBanner from "./HomeBanner";
import HomeGuide from "./HomeGuide";
import HomeSupport from "./HomeSupport";
import { HeaderPageContainer } from "../../StyledComponents";

export default function Home() {
    return (
        <Container>
            <HomeBanner />
            <HomeGuide />
            <HomeSupport />
        </Container>
    );
}

const Container = styled(HeaderPageContainer)``;
