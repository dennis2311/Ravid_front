import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
    const underline = useRef<HTMLDivElement>(null);

    function swiftUnderline(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (underline && underline.current) {
            underline.current.style.left =
                e.currentTarget.offsetLeft.toString() + "px";
            underline.current.style.width =
                e.currentTarget.offsetWidth.toString() + "px";
        }
    }

    function removeUnderline() {
        if (underline && underline.current) {
            underline.current.style.width = "0px";
        }
    }

    return (
        <Container>
            <HeaderColumn>
                <HeaderIconImg
                    src={require("../../Resources/img/ravid-icon.png")}
                />
                <HeaderIconText>RAVID</HeaderIconText>
            </HeaderColumn>
            <HeaderCenterColumn
                onMouseOut={() => {
                    removeUnderline();
                }}
            >
                <Link to="/" style={{ textDecoration: "none" }}>
                    <LinkButton
                        onMouseOver={(e) => {
                            swiftUnderline(e);
                        }}
                    >{`회사 소개`}</LinkButton>
                </Link>
                <Link to="synthesis" style={{ textDecoration: "none" }}>
                    <LinkButton
                        onMouseOver={(e) => {
                            swiftUnderline(e);
                        }}
                    >{`데모 페이지`}</LinkButton>
                </Link>
                <LinkUnderline ref={underline} />
            </HeaderCenterColumn>
            <HeaderColumn></HeaderColumn>
        </Container>
    );
}

const Container = styled.header`
    display: flex;
    justify-content: space-between;
    height: ${(props) => props.theme.header.height};
    background-color: #f2f5f8;
    margin-bottom: 50px;
`;

const HeaderColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 25%;
    height: 100%;
    color: ${(props) => props.theme.color.iconBlue};
`;

const HeaderCenterColumn = styled(HeaderColumn)`
    position: relative;
    display: flex;
    gap: 80px;
    width: fit-content;
    font-family: "NexonGothicBold";
    font-weight: bold;
`;

const HeaderIconImg = styled.img`
    height: 60%;
    width: fit-content;
`;

const HeaderIconText = styled.span`
    font-size: 24px;
    color: ${(props) => props.theme.color.iconBlue};
    font-family: "NexonGothicBold";
    font-weight: bold;
`;

const LinkButton = styled.div`
    height: 100%;
    align-items: center;
    text-decoration: none;
    color: gray;
`;

const LinkUnderline = styled.div`
    position: absolute;
    left: 0px;
    bottom: 15px;
    height: 3px;
    background-color: ${(props) => props.theme.header.iconColor};
    transition: 0.5s;
`;
