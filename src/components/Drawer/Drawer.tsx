import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Drawer.module.css';

import homeicon from '../../assets/interface/house-chimney.svg';
import modulesicon from '../../assets/interface/folder.svg';
import createmoduleicon from '../../assets/interface/folder-plus-circle.svg';
import testsicon from '../../assets/interface/web-test.svg';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const pages = [
    { path: '/', label: 'Home', icon: <img src={homeicon} alt="Icon of the home" /> },
    { path: '/modules', label: 'Modules', icon: <img src={modulesicon} alt="Icon of the folder or module" /> },
    { path: '/createmodule', label: 'Create Module', icon: <img src={createmoduleicon} alt="Icon of the module with plus" /> },
    { path: '/tests', label: 'Tests', icon: <img src={testsicon} alt="Icon with correct and incorrect tests" /> },
];

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
    const location = useLocation();

    return (
        <nav
            className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
            aria-label="Main navigation"
        >
            <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close menu"
            >
                × Close
            </button>

            <ul className={styles.menu}>
                {pages.map((page) => (
                    <li key={page.path}>
                        <Link
                            to={page.path}
                            onClick={onClose}
                            className={`${styles.menuItem} ${location.pathname === page.path ? styles.active : ''
                                }`}
                        >
                            <span className={styles.icon}>{page.icon}</span>
                            {page.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Drawer;
