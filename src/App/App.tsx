import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import Home from "../Page/Home";
import Synthesis from "../Page/Synthesis";
import { Container } from "./AppStyledComponents";

export default function App() {
    return (
        <BrowserRouter>
            <Container>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/conversion" element={<Synthesis />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}
