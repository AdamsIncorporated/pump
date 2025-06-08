import React, { FC, useState } from "react";
import DataPanel from "./panel";
import WeightLineChart from "./charts/weight";
import CalorieLineChart from "./charts/calorie";
import LiftLineChart from "./charts/lift";

const panelArray = [
  {
    title: "Calories",
    tableName: "calorie",
    bgColor: "red",
    chartObject: CalorieLineChart,
  },
  {
    title: "Weight",
    tableName: "weight",
    bgColor: "blue",
    chartObject: WeightLineChart,
  },
  {
    title: "Lift",
    tableName: "lift",
    bgColor: "yellow",
    chartObject: LiftLineChart,
  },
];

const PanelGroupComponent: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePanel = panelArray[activeIndex];
  const ChartComponent = activePanel.chartObject;

  return (
    <div className="h-screen overflow-auto p-4 max-w-1/2">
      <div className="flex space-x-4 mb-4">
        {panelArray.map((panel, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded ${
              index === activeIndex ? "bg-slate-500 text-white" : "bg-slate-800"
            }`}
          >
            {panel.title}
          </button>
        ))}
      </div>

      <DataPanel
        tableName={activePanel.tableName}
        title={activePanel.title}
        bgColor={activePanel.bgColor}
        chartObject={ChartComponent}
      />
    </div>
  );
};

export default PanelGroupComponent;
