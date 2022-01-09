import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    HeaderColumn,
    HeaderCenterColumn,
    HeaderIcon,
    LinkButton,
    LinkUnderline,
} from "./HeaderStyledComponent";

export default function HeaderContainer() {
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
                <HeaderIcon>{`RAVID`}</HeaderIcon>
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
                <Link to="conversion" style={{ textDecoration: "none" }}>
                    <LinkButton
                        onMouseOver={(e) => {
                            swiftUnderline(e);
                        }}
                    >{`영상 합성`}</LinkButton>
                </Link>
                <LinkUnderline ref={underline} />
            </HeaderCenterColumn>
            <HeaderColumn></HeaderColumn>
        </Container>
    );
}
