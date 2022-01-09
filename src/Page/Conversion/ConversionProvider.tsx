import React, { createContext, useContext } from "react";
import { ChildrenProp } from "../../Constant";

interface ConversionContextProp {}

const InitialConversionContext = {};

const ConversionContext = createContext(InitialConversionContext);
export const useConversionContext = () => useContext(ConversionContext);

export default function ConversionProvider({ children }: ChildrenProp) {
    const conversionContext = {};

    return (
        <ConversionContext.Provider value={conversionContext}>
            {children}
        </ConversionContext.Provider>
    );
}
