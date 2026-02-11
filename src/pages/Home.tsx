import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import germany from '../assets/languages/germany.png';
import spain from '../assets/languages/spain.png';
import france from '../assets/languages/france.png';
import italy from '../assets/languages/italy.png';
import portugal from '../assets/languages/portugal.png';
import netherlands from '../assets/languages/netherlands.png';
import createmodule from '../assets/interface/add.svg';
import viewmodules from '../assets/interface/graduation-cap.svg';

const Home: React.FC = () => {
    return (
        <>
            <header>
                <h1 className="welcome">Welcome to the App, where you can practice Article-based Languages!</h1>
            </header>

            <div className="home-container">

                <section aria-labelledby="supported-languages" className="list-languages">
                    <h2 id="supported-languages">Supported languages:</h2>
                    <ul className="languages">
                        <li><img src={germany} alt="Flag of Germany" /> German</li>
                        <li><img src={spain} alt="Flag of Spain" /> Spanish</li>
                        <li><img src={france} alt="Flag of France" /> French</li>
                        <li><img src={italy} alt="Flag of Italy" /> Italian</li>
                        <li><img src={portugal} alt="Flag of Portugal" /> Portuguese</li>
                        <li><img src={netherlands} alt="Flag of Netherlands" /> Dutch</li>
                    </ul>
                </section>

                <section aria-labelledby="info-section">
                    <h3 id="info-section">How it works?</h3>
                    <ul className="info">
                        <li>
                            Create a Module where you can add <span className="highlight">Noun</span>, <span className="highlight">Translation</span> and <span className="highlight">Article</span>
                        </li>
                        <li>
                            Start practice your Modules via exercises
                        </li>
                        <li>
                            Improve your skills in Foreign Languages!
                        </li>
                    </ul>
                </section>

                <nav aria-label="Home actions">
                    <h3>Choose what you want to do today:</h3>
                    <ul className="home-buttons">
                        <li>
                            <Link
                                to="/modules"
                                className="home-button"
                                role="button"
                                aria-label="View a module"
                            >
                                <img src={viewmodules} alt="Icon of the button with the Graduation cap" className='go-button' />
                                View Modules
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/createmodule"
                                className="home-button"
                                role="button"
                                aria-label="Create a module"
                            >
                                <img src={createmodule} alt="Icon of the button with pen and paper" className='go-button' />
                                Create Module
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Home;