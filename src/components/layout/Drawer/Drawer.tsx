import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Drawer.module.css';

import homeicon from '../../../assets/interface/house-chimney.svg';
import modulesicon from '../../../assets/interface/folder.svg';
import createmoduleicon from '../../../assets/interface/folder-plus-circle.svg';
import testsicon from '../../../assets/interface/web-test.svg';

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
    const drawerRef = useRef<HTMLElement>(null);

    // Focus trap + Escape key
    useEffect(() => {
        if (!isOpen || !drawerRef.current) return;

        const focusableElements = Array.from(
            drawerRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex="0"]'
            )
        );

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        // Focus first element when drawer opens
        first.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Optionally remove focus from drawer when closing
    useEffect(() => {
        if (!isOpen && document.activeElement instanceof HTMLElement && drawerRef.current?.contains(document.activeElement)) {
            document.activeElement.blur();
        }
    }, [isOpen]);

    return (
        <nav
            ref={drawerRef}
            className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
            aria-label="Main navigation"
            {...(!isOpen ? { inert: true } : {})} // prevents focus and interaction when closed
        >
            <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close menu"
                tabIndex={isOpen ? 0 : -1}
            >
                × Close
            </button>

            <ul className={styles.menu}>
                {pages.map((page) => (
                    <li key={page.path}>
                        <Link
                            to={page.path}
                            onClick={onClose}
                            className={`${styles.menuItem} ${location.pathname === page.path ? styles.active : ''}`}
                            tabIndex={isOpen ? 0 : -1}
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
