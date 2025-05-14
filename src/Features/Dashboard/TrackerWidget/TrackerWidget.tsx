import { ProgressBar } from "./Components/ProgressBar/ProgressBar";
import styles from "./TrackerWidget.module.scss";
import Logo from "@assets/TrackerWidget/logo.svg?react";
import { useTranslation } from "react-i18next";

export const TrackerWidget = () => {
	const { t } = useTranslation();
	
	return (
		<div className={styles["TrackerWidget-container"]}>
			<div className={styles["TrackerWidget-Head"]}>
				<div className={styles["TrackerWidget-icon-container"]}>
					<Logo className={styles["TrackerWidget-icon"]} />
				</div>
				<p className={styles["TrackerWidget-text"]}>
					{t("dashboard.tracker_widget.stay_tuned")}. {t("dashboard.tracker_widget.checking")}{" "}
					<span className={styles["TrackerWidget-text-highlight"]}>
						{t("dashboard.health_conditions.cholesterol")}
					</span>
				</p>
			</div>
			<ProgressBar progress={31} />
			<p className={styles["TrackerWidget-text"]}>
				{t("dashboard.tracker_widget.results_expected")} {t("dashboard.tracker_widget.in")}{" "}
				<span className={styles["TrackerWidget-text-highlight"]}>3 {t("dashboard.tracker_widget.days")}</span>
			</p>
		</div>
	);
};
