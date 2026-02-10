import styles from './Header.module.css';
import languages from './../../assets/interface/language.svg'

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

            <img src={languages} alt="Icon which presents learning languages" className={styles.logo} />

            <p className={styles.account}>Account</p>
        </header>
    );
};

export default Header;