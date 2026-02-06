import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    return (
        <>
            <header>
                <h1>Welcome to the App, where you can practice Articles!</h1>
            </header>

            <div className="home-container">

                <nav aria-label="Home actions">
                    <h2>Choose what you want to do today:</h2>
                    <ul className="home-buttons">
                        <li>
                            <Link
                                to="/modules"
                                className="home-button"
                                role="button"
                                aria-label="View a module"
                            >
                                View Modules
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/add-module"
                                className="home-button"
                                role="button"
                                aria-label="Create a module"
                            >
                                Create Module
                            </Link>
                        </li>
                    </ul>
                </nav>

                <section aria-labelledby="info-section">
                    <h3 id="info-section">How it works?</h3>
                    <ul className="info">
                        <li>
                            Create a Module where you can add <span className="highlight">Noun</span>, <span className="highlight">Translation</span> and <span className="highlight">Article</span>.
                        </li>
                        <li>
                            Start practice your Modules via exercises.
                        </li>
                        <li>
                            Improve your skills in Foreign Languages!
                        </li>
                    </ul>
                </section>
            </div>
        </>
    );
};

export default Home;