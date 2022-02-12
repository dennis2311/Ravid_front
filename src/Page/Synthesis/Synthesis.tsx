import React from "react";
import SynthesisProvider from "./SynthesisProvider";
import SynthesisContainer from "./SynthesisContainer";

export default function Synthesis() {
    return (
        <SynthesisProvider>
            <SynthesisContainer />
        </SynthesisProvider>
    );
}
