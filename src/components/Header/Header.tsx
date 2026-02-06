import styles from './Header.module.css';

interface HeaderProps {
    onMenuOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
    return (
        <header className={styles.header}>
            <button
                className={styles.menuButton}
                onClick={onMenuOpen}
                aria-label="Open menu"
                aria-haspopup="true"
            >
                ☰ Menu
            </button>

            <h1 className={styles.title}>Articles Study App</h1>

            <h1 className={styles.account}>Account</h1>
        </header>
    );
};

export default Header;
