import React from "react";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import DataPanel from "./panel";

const panelData = [
  {
    title: "Calories",
    chartData: [1, 2, 3, 4],
    bgColor: "red",
    chartTitle: "Calories",
  },
  {
    title: "Weight",
    chartData: [67, 70, 65, 80],
    bgColor: "blue",
    chartTitle: "Weight (lbs)",
  },
  {
    title: "Lift",
    chartData: [67, 70, 65, 80],
    bgColor: "yellow",
    chartTitle: "Lift",
  },
];

const tableHeaders = ["Name", "Age", "Role"];
const tableData = [
  ["Alice", 25, "Engineer"],
  ["Bob", 30, "Designer"],
  ["Charlie", 28, "Manager"],
];

export default function Grid() {
  return (
    <div className="h-screen">
      <PanelGroup autoSaveId="persistence" direction="horizontal">
        {panelData.map((panel, index) => (
          <React.Fragment key={panel.title}>
            <DataPanel
              title={panel.title}
              chartData={panel.chartData}
              bgColor={panel.bgColor}
              chartTitle={panel.chartTitle}
              tableHeaders={tableHeaders}
              tableData={tableData}
            />
            {index < panelData.length - 1 && <PanelResizeHandle />}
          </React.Fragment>
        ))}
      </PanelGroup>
    </div>
  );
}
