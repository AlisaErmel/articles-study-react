import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    return (
        <>
            <header>
                <h1>Articles Study App</h1>
            </header>

            <main className="home-container">

                <nav aria-label="Main navigation">
                    <p>Choose an option to continue:</p>
                    <ul className="home-buttons">
                        <li>
                            <Link
                                to="/modules"
                                className="home-button"
                                role="button"
                                aria-label="Add or modify a module"
                            >
                                Add/Modify Module
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/train"
                                className="home-button"
                                role="button"
                                aria-label="Train a module"
                            >
                                Train Module
                            </Link>
                        </li>
                    </ul>
                </nav>

                <section aria-labelledby="info-section">
                    <h2 id="info-section">How it works</h2>
                    <p>
                        Create modules with words and articles, then practice and test yourself to
                        improve your skills in foreign languages.
                    </p>
                </section>
            </main>
        </>
    );
};

export default Home;