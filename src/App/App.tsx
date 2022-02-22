import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import Home from "../Page/Home";
import Synthesis from "../Page/Synthesis";
import Footer from "../Components/Footer";
import { OutestContainer } from "../StyledComponents";

export default function App() {
    return (
        <BrowserRouter>
            <Container>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/synthesis" element={<Synthesis />} />
                </Routes>
                <Footer />
            </Container>
        </BrowserRouter>
    );
}

export const Container = styled(OutestContainer)``;
