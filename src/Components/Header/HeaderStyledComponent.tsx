import styled from "styled-components";

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: ${(props) => props.theme.header.headerHeight};
    box-shadow: ${(props) => props.theme.header.headerShadow};
`;

export const HeaderColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
`;

export const HeaderCenterColumn = styled(HeaderColumn)`
    position: relative;
    display: flex;
    gap: 80px;
    width: fit-content;
`;

export const HeaderIcon = styled.span`
    font-size: 24px;
    color: ${(props) => props.theme.header.iconColor};
`;

export const LinkButton = styled.div`
    height: 100%;
    align-items: center;
    color: grey;
`;

export const LinkUnderline = styled.div`
    position: absolute;
    left: 0px;
    bottom: 15px;
    height: 3px;
    background-color: ${(props) => props.theme.header.iconColor};
    transition: 0.5s;
`;
