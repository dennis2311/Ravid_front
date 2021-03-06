import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../Fonts/fonts.css";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    }
    html, body, #root{
        width:100%;
        height:100vh;
        overflow:hidden;
    }
    html{
        min-width: 1280px;
        min-height: 720px;
    }
    #root{
        position:relative;
        overflow:auto;
    }
`;

export default GlobalStyles;
