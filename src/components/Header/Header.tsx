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

            <p className={styles.title}>Articles Study App</p>

            <p className={styles.account}>Account</p>
        </header>
    );
};

export default Header;
