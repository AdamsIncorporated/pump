import React, { useEffect, useState } from "react";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import DataPanel from "./panel";
import { read } from "./api";

export default function Grid() {
  const [panelData, setPanelData] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [calories, weight, lift] = await Promise.all([
        read("calorie"),
        read("weight"),
        read("lift"),
      ]);

      setPanelData([
        {
          title: "Calories",
          chartData: calories,
          bgColor: "red",
          chartTitle: "Calories",
        },
        {
          title: "Weight",
          chartData: weight,
          bgColor: "blue",
          chartTitle: "Weight (lbs)",
        },
        {
          title: "Lift",
          chartData: lift,
          bgColor: "yellow",
          chartTitle: "Lift",
        },
      ]);
    }

    fetchData();
  }, []);

  if (!panelData) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="h-screen">
      <PanelGroup autoSaveId="persistence" direction="horizontal">
        {panelData.map((panel, index) => (
          <React.Fragment key={panel.title}>
            <DataPanel
              title={panel.title}
              data={panel.chartData}
              bgColor={panel.bgColor}
              chartTitle={panel.chartTitle}
            />
            {index < panelData.length - 1 && <PanelResizeHandle />}
          </React.Fragment>
        ))}
      </PanelGroup>
    </div>
  );
}
