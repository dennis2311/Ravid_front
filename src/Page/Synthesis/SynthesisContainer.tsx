import React from "react";
import styled from "styled-components";
import SynthesisHeader from "./SynthesisHeader";
import SynthesisFileInput from "./SynthesisFileInput";
import SynthesisButtonAndNotice from "./SynthesisButtonAndNotice";
import SynthesisPreviews from "./SynthesisPreviews";
import SynthesisGuide from "./SynthesisGuide";
import { HeaderPageContainer } from "../../StyledComponents";

export default function SynthesisContainer() {
    return (
        <Container>
            <SynthesisHeader />
            <SynthesisFileInput />
            <SynthesisButtonAndNotice />
            <SynthesisPreviews />
            <SynthesisGuide />
        </Container>
    );
}

const Container = styled(HeaderPageContainer)``;
