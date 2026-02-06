import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Drawer.module.css';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const pages = [
    { path: '/', label: 'Home' },
    { path: '/modules', label: 'Modules' },
    { path: '/create-module', label: 'Create Module' },
    { path: '/tests', label: 'Tests' },
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
                            {page.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Drawer;
