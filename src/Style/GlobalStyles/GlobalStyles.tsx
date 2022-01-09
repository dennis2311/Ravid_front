import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    }
    html, body, #root{
        width:100%;
        height:100%;
    }
    html{
        min-width: 1080px;
        min-height: 720px;
        overflow:auto;
    }
`;

export default GlobalStyles;
