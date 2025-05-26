import DataPanel from "./panel";
import React, { useEffect, useState } from "react";
import { read } from "./api";
import { PanelGroup } from "react-resizable-panels";

export default function Grid() {
  const panelArray = [
    { title: "Calories", tableName: "calorie", bgColor: "red" },
    { title: "Weight", tableName: "calorie", bgColor: "blue" },
    { title: "Lift", tableName: "calorie", bgColor: "yellow" },
  ];

  return (
    <div className="h-screen p-4">
      <PanelGroup direction="vertical" style={{ height: "100%" }}>
        {panelArray
          .map((panel, index) => (
            <DataPanel
              key={index}
              tableName={panel.tableName}
              title={panel.title}
              bgColor={panel.bgColor}
            />
          ))}
      </PanelGroup>
    </div>
  );
}
