import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PlanWidget.module.scss";
import { Tabs } from "./Components/Tabs/Tabs";
import { PlanTable } from "./Components/PlanTable/PlanTable";
import { PlanAggregate } from "./Components/PlanAggregate/PlanAggregate";
import { PlanSection } from "./helpers/planMockData";

interface PlanWidgetProps {
	backgroundColor: string;
	planData: PlanSection[];
}

export const PlanWidget = ({ backgroundColor, planData }: PlanWidgetProps) => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(planData[0].title);
	const [transitioning, setTransitioning] = useState(false);

	// Translate tab titles
	const getTranslatedTabTitle = (title: string) => {
		switch (title) {
			case "Action Plan":
				return t("dashboard.plan_widget.action_plan");
			case "Follow-up Care":
				return t("dashboard.plan_widget.follow_up_care");
			case "Supplements":
				return t("dashboard.plan_widget.supplements");
			case "Lifestyle":
				return t("dashboard.plan_widget.lifestyle");
			default:
				return title;
		}
	};

	const getActionPlanData = () => {
		return planData
			.filter((section) => section.title !== "Action Plan")
			.flatMap((section) =>
				section.data.map((item) => ({
					...item,
					group: getTranslatedTabTitle(section.title),
				})),
			);
	};

	const enrichedPlanMockData = planData.map((section) => {
		const translatedTitle = getTranslatedTabTitle(section.title);
		return section.title === "Action Plan"
			? { ...section, title: translatedTitle, data: getActionPlanData() }
			: { ...section, title: translatedTitle };
	});

	const activeSection = enrichedPlanMockData.find(
		(section) => section.title === activeTab || section.title === getTranslatedTabTitle(activeTab),
	);

	const handleTabChange = (newTab: string) => {
		setTransitioning(true);
		setActiveTab(newTab);
	};

	return (
		<div
			className={`${styles["PlanWidget-wrapper"]} ${backgroundColor === "blue" && styles["PlanWidget-wrapper-blue"]}`}
		>
			<Tabs
				sections={enrichedPlanMockData}
				activeTab={activeTab}
				setActiveTab={handleTabChange}
				backgroundColor={backgroundColor}
			/>
			<div className={styles["PlanWidget-content"]}>
				{(activeTab === "Action Plan" || activeTab === t("dashboard.plan_widget.action_plan")) && activeSection ? (
					<PlanAggregate
						section={activeSection}
						setActiveTab={setActiveTab}
						backgroundColor={backgroundColor}
					/>
				) : (
					<>
						{activeSection && (
							<PlanTable
								section={activeSection}
								setActiveTab={setActiveTab}
								transitioning={transitioning}
								setTransitioning={setTransitioning}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};
