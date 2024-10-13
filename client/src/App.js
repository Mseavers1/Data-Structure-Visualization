import React, {useState} from 'react';
import './ProjectStylesheet.css';

import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import {MenuOutlined, CloseOutlined} from '@ant-design/icons';

import About from "./components/about"
import Algorithms from "./components/algorithms"
import Credits from "./components/credits"
import Arrays from "./components/algorithms/Arrays"

const App = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <Router>
            <div className="app-div">
                <header>
                    <div className="left">
                        <img className="logo" src="/images/wkucuptall_w.png" alt="Logo of Western Kentucky University"/>
                        <h1 className="title">Dynamic Algorithm Visualizer</h1>
                    </div>

                    <div className="right">
                        <nav className="routes">
                            <Link to="/">About</Link>
                            <Link to="/algorithms"> Algorithms </Link>
                            <Link to="/credits"> Credits </Link>
                        </nav>

                        <div className="hamburger" onClick={toggleMenu}>
                            {isMenuOpen ? <CloseOutlined/> : <MenuOutlined />}
                        </div>
                    </div>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<About/>}/>
                        <Route path="/algorithms" element={<Algorithms/>}/>
                        <Route path="/credits" element={<Credits />} />
                        <Route path="/algorithms/arrays" element={<Arrays/>} />
                    </Routes>
                </main>

                <footer>
                    <div className="footer">
                        <h3>Developed by Michael Seavers </h3>
                        <h3>For Western Kentucky University</h3>
                        <h3>November 20th, 2024</h3>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default App;
