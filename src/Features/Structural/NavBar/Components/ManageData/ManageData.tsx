import styles from "./ManageData.module.scss";
import { useTranslation } from "react-i18next";

// Importing SVGs as React Components
import PlusIcon from "@assets/Dahsboard/Plus.svg?react";

const ManageData = () => {
	const { t } = useTranslation();
	
	return (
		<div className={styles["ManageData"]}>
			<button className={styles["icon-button"]}>
				<PlusIcon />
			</button>
			<p className={styles["p"]}>{t("navbar.manage_data")}</p>
		</div>
	);
};

export default ManageData;
