import React from "react";
import {
    Container,
    SynthesisPageTitle,
    DropBoxRow,
    GuidesRow,
    GuideCard,
} from "./ConversionStyledComponents";

export default function ConversionContainer() {
    return (
        <Container>
            <SynthesisPageTitle>{`합성하기`}</SynthesisPageTitle>
            <DropBoxRow></DropBoxRow>
            <GuidesRow>
                <GuideCard></GuideCard>
                <GuideCard></GuideCard>
            </GuidesRow>
        </Container>
    );
}
