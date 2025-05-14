import QuestionMark from "@assets/PlanWidget/QuestionMark.svg?react";
import ChevronHollow from "@assets/CtaModal/ChevronHollow.svg?react";
import Cart from "@assets/CtaModal/Cart.svg?react";
import styles from "./PlanRow.module.scss";
import { PlanItem } from "../../helpers/planMockData";
import { useTranslation } from "react-i18next";

export const PlanRow = ({
	item,
	setActiveTab,
}: {
	item: PlanItem;
	setActiveTab: (tab: string) => void;
}) => {
	const { t } = useTranslation();
	
	const handleClick = () => {
		if (item.link) {
			setActiveTab(item.link);
		}
	};
	
	// Translate activity names
	const getTranslatedActivityName = (name: string) => {
		// Convert the text to a key by making it lowercase and replacing spaces with underscores
		const key = name.toLowerCase().replace(/\s+/g, '_');
		
		// Use the translated text if it exists, otherwise return the original name
		return t(`dashboard.plan_widget.plan_activities.${key}`, name);
	};
	
	return (
		<div className={styles["PlanRow-row"]} onClick={handleClick}>
			<div className={styles["PlanRow-icon"]}>
				<img src={item.icon} alt={`${getTranslatedActivityName(item.name)} icon`} />
			</div>
			<div className={styles["PlanRow-body"]}>
				<div className={styles["PlanRow-name"]}>
					{item.count && (
						<span className={styles["PlanRow-count"]}>{item.count} </span>
					)}
					{getTranslatedActivityName(item.name)}
				</div>
				<div className={styles["PlanRow-desc"]}>{item.description}</div>
			</div>
			<div className={styles["PlanRow-misc"]}>
				{item.dosage && (
					<div className={styles["PlanRow-dosage"]}>{item.dosage}</div>
				)}
				{item.frequency && (
					<div className={styles["PlanRow-frequency"]}>{item.frequency}</div>
				)}
			</div>
			<div className={styles["PlanRow-buttons"]}>
				<div className={styles["PlanRow-why"]}>
					<p>Why</p>
					<QuestionMark />
				</div>
				{item.link ? (
					<div className={styles["PlanRow-chevron-container"]}>
						<ChevronHollow />
					</div>
				) : (
					<button className={styles["PlanRow-cart"]}>
						<p>Add to Cart</p>
						<Cart />
					</button>
				)}
			</div>
		</div>
	);
};
