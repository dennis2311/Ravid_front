import styled from "styled-components";
import { HeaderPageContainer } from "../../Style/StyledComponents";

export const Container = styled(HeaderPageContainer)`
    overflow-y: auto;
    > div {
        margin: auto;
        margin-top: 40px;
    }
`;

export const SynthesisPageTitle = styled.div`
    text-align: center;
    font-size: 32px;
`;

export const DropBoxRow = styled.div`
    width: 85%;
    height: 360px;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
`;

export const GuidesRow = styled.div`
    display: flex;
    justify-content: space-around;
    width: 85%;
    height: 320px;
`;

export const GuideCard = styled.div`
    display: flex;
    width: 45%;
    height: 100%;
    background-color: ${(props) =>
        props.theme.conversion.conversionGuideCardColor};
    border-radius: 20px;
`;
