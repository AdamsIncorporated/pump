import React, { useState, ReactNode } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import Weight from "./weight/weight";
import DataPanel from "./panel";

export default function Grid() {
  return (
    <div className="h-screen">
      <PanelGroup autoSaveId="persistence" direction="horizontal">
        <DataPanel
          title="Calories"
          chartData={[1, 2, 3, 4]}
          bgColor="red"
          chartTitle="Calories"
          tableHeaders={["Name", "Age", "Role"]}
          tableData={[
            ["Alice", 25, "Engineer"],
            ["Bob", 30, "Designer"],
            ["Charlie", 28, "Manager"],
          ]}
        />
        <PanelResizeHandle />
        <DataPanel
          title="Weight"
          chartData={[67, 70, 65, 80]}
          bgColor="blue"
          chartTitle="Weight (lbs)"
          tableHeaders={["Name", "Age", "Role"]}
          tableData={[
            ["Alice", 25, "Engineer"],
            ["Bob", 30, "Designer"],
            ["Charlie", 28, "Manager"],
          ]}
        >
          <Weight />
        </DataPanel>
        <PanelResizeHandle />
        <DataPanel
          title="Lift"
          chartData={[67, 70, 65, 80]}
          bgColor="yellow"
          chartTitle="Lift"
          tableHeaders={["Name", "Age", "Role"]}
          tableData={[
            ["Alice", 25, "Engineer"],
            ["Bob", 30, "Designer"],
            ["Charlie", 28, "Manager"],
          ]}
        />
      </PanelGroup>
    </div>
  );
}
