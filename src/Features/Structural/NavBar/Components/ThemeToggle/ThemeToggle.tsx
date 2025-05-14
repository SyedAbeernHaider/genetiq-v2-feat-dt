import { useTheme } from '@/App/Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const ariaLabel = `Switch to ${t(`theme.${nextTheme}`)} mode`;

  return (
    <div className={styles["theme-toggle"]}>
      <button 
        onClick={toggleTheme} 
        className={styles["toggle-button"]}
        aria-label={ariaLabel}
      >
        {theme === 'light' ? (
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        ) : (
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle; 