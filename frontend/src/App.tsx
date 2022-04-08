import React from 'react';
import { Footer, Navbar } from './components';
import { Cards, Landing, References, Wiki } from './pages';
import { Routes, Route } from "react-router-dom"

export const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/wiki" element={<Wiki />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/references" element={<References />} />

                <Route path="*" element={<Landing />} />
            </Routes>
            <Footer/>


        </div>
    );
}

