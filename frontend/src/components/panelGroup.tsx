import React, { FC, useState, useEffect } from "react";
import DataPanel from "./panel";
import WeightLineChart from "./charts/weight";
import CalorieLineChart from "./charts/calorie";
import LiftLineChart from "./charts/lift";
import { read } from "./api";

async function fetchData(tableName?: string) {
  if (!tableName) return null;
  try {
    const data = await read(tableName);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

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
  const [panelData, setPanelData] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchActivePanelData = async () => {
      const tableName = activePanel.tableName;
      const data = await fetchData(tableName);
      setPanelData((prev) => ({ ...prev, [tableName]: data }));
    };

    // Only fetch if data hasn't been fetched already
    if (!panelData[activePanel.tableName]) {
      fetchActivePanelData();
    }
  }, [activeIndex]);

  const activePanel = panelArray[activeIndex];
  const data = panelData[activePanel.tableName] || [];

  return (
    <div className="h-screen overflow-auto p-4 max-w-1/2">
      <div className="flex space-x-4 mb-4">
        {panelArray.map((panel, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded ${
              index === activeIndex
                ? "bg-slate-500 text-white"
                : "bg-slate-800 text-white"
            }`}
          >
            {panel.title}
          </button>
        ))}
      </div>

      <DataPanel
        title={activePanel.title}
        tableName={activePanel.tableName}
        bgColor={activePanel.bgColor}
        chartObject={activePanel.chartObject}
        data={data}
      />
    </div>
  );
};

export default PanelGroupComponent;
