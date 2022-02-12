import styled from "styled-components";
import { HeaderPageContainer } from "../../Style/StyledComponents";

export const Container = styled(HeaderPageContainer)`
    overflow-y: auto;
    /* 자손들에게 일괄적으로 속성 부여 */
    > div,
    form {
        margin: auto;
        margin-top: 40px;
    }
`;

export const SynthesisPageTitle = styled.div`
    text-align: center;
    font-size: 32px;
`;

export const FileInputFormRow = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85%;
    height: 360px;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
`;

export const FileInputRow = styled.div`
    display: flex;
    justify-content: center;
`;

export const PhotoPreview = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    border: 2px solid black;
`;

export const VideoPreview = styled.video`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    max-height: 400px;
    border: 2px solid black;
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
