import React from 'react';
import './ProjectStylesheet.css';

import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import About from "./components/about"
import Data_structures from "./components/data_structures"
import Algorithms from "./components/algorithms"
import Credits from "./components/credits"

const App = () => {
    return (
        <Router>
            <div className="app-div">
                <header>
                    <h1 className="title">Visualizer for Data Structures & Algorithms</h1>
                    <nav className="routes">
                        <Link to="/">About</Link> |
                        <Link to="/data_structures"> Data Structures </Link> |
                        <Link to="/algorithms"> Algorithms </Link> |
                        <Link to="/credits"> Credits </Link>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/data_structures" element={<Data_structures />} />
                        <Route path="/algorithms" element={<Algorithms />} />
                        <Route path="/credits" element={<Credits />} />
                    </Routes>
                </main>

                <footer>
                    <h3>Developed by Michael Seavers | Designed for Western Kentucky University | Inspired by David Galles</h3>
                </footer>
            </div>
        </Router>
    );
};

export default App;
