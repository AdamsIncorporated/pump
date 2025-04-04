import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import LineChart from "./lineChart";

export default function Grid() {
  return (
    <div className="h-screen border">
      <PanelGroup autoSaveId="persistence" direction="horizontal">
        <Panel minSize={20} className="border border-2-white p-2">
          Calories
          <div className="my-5">
            <LineChart chartTitle="Calories" data={[1, 2, 3, 4]} />
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel minSize={20} className="border border-2-white p-2">
          Weight
          <div className="my-5">
            <LineChart chartTitle="Weight (lbs)" data={[67, 70, 65, 80]} />
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel minSize={20} className="border border-2-white p-2">
          Lift
        </Panel>
      </PanelGroup>
    </div>
  );
}
