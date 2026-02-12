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
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);
    const lastLinkRef = useRef<HTMLAnchorElement>(null);

    // Focus trap + Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
            if (e.key === 'Tab') {
                const focusable = [closeButtonRef.current, firstLinkRef.current, lastLinkRef.current].filter(Boolean) as HTMLElement[];
                if (!focusable.length) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

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
        // Focus first element
        closeButtonRef.current?.focus();

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <nav
            className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
            aria-label="Main navigation"
            aria-hidden={!isOpen}
        >
            <button
                ref={closeButtonRef}
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close menu"
                tabIndex={isOpen ? 0 : -1}
            >
                × Close
            </button>

            <ul className={styles.menu}>
                {pages.map((page, index) => (
                    <li key={page.path}>
                        <Link
                            ref={
                                index === 0
                                    ? firstLinkRef
                                    : index === pages.length - 1
                                        ? lastLinkRef
                                        : null
                            }
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
