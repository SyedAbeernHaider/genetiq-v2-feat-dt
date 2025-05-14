import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelector.module.scss";
import LanguageIcon from "@assets/Navbar/Icons/Language.svg?react";

const LanguageSelector = () => {
	const { i18n, t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Get current language
	const currentLanguage = i18n.language;

	// Language options
	const languages = [
		{ code: "en", name: t("language_selector.english") },
		{ code: "fil", name: t("language_selector.filipino") },
		{ code: "ur", name: t("language_selector.urdu") },
	];

	// Handle language change
	const changeLanguage = (code: string) => {
		i18n.changeLanguage(code);
		setIsOpen(false);
	};

	// Handle click outside of dropdown
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Toggle dropdown
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles["language-selector"]} ref={dropdownRef}>
			<button
				className={styles["language-button"]}
				onClick={toggleDropdown}
				aria-expanded={isOpen}
				aria-label={t("navbar.language")}
			>
				<LanguageIcon />
				<span className={styles["language-code"]}>
					{currentLanguage.toUpperCase()}
				</span>
			</button>

			{isOpen && (
				<div className={styles["language-dropdown"]}>
					<div className={styles["dropdown-title"]}>
						{t("language_selector.title")}
					</div>
					<ul>
						{languages.map((lang) => (
							<li key={lang.code}>
								<button
									className={`${styles["language-option"]} ${
										currentLanguage === lang.code ? styles["active"] : ""
									}`}
									onClick={() => changeLanguage(lang.code)}
								>
									{lang.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default LanguageSelector; 