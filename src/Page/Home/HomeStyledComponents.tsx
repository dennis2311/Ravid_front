import styled from "styled-components";
import {
    HeaderPageContainer,
    StylelessButton,
} from "../../Style/StyledComponents";

export const Container = styled(HeaderPageContainer)`
    overflow-y: auto;
    gap: 12px;
`;

export const MainBanner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 360px;
    font-size: 40px;
    color: white;
    background-color: ${(props) => props.theme.home.mainBannerColor};
`;

export const ConvertButtonRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;
    padding-top: 48px;
`;

export const ConvertButton = styled(StylelessButton)`
    font-size: 20px;
    padding: 16px 28px;
    color: ${(props) => props.theme.home.convertButtonColor};
    border: 3px solid ${(props) => props.theme.home.convertButtonColor};
    border-radius: 18px;
`;
