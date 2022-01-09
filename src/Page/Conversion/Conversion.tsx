import React from "react";
import ConversionProvider from "./ConversionProvider";
import ConversionContainer from "./ConversionContainer";

export default function Conversion() {
    return (
        <ConversionProvider>
            <ConversionContainer />
        </ConversionProvider>
    );
}
