import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import LineChart from "./lineChart";

// Reusable Panel component
const DataPanel = ({ title, data, bgColor, chartTitle }) => {
  return (
    <Panel minSize={20} className="border-x-2">
      <div className="flex group">
        <div
          className={`bg-${bgColor}-200 group-hover:${bgColor}-300 duration-300 ease-in w-fit text-black font-bold px-5`}
        >
          {title}
        </div>
        <div
          className={`bg-${bgColor}-100 group-hover:${bgColor}-200 duration-300 ease-in w-1/2 rounded-l-none rounded-r-full`}

        ></div>
      </div>
      <div className="m-5">
        <LineChart chartTitle={chartTitle} data={data} />
      </div>
    </Panel>
  );
};

export default function Grid() {
  return (
    <div className="h-screen">
      <PanelGroup autoSaveId="persistence" direction="horizontal">
        <DataPanel
          title="Calories"
          data={[1, 2, 3, 4]}
          bgColor="red"
          chartTitle="Calories"
        />
        <PanelResizeHandle />
        <DataPanel
          title="Weight"
          data={[67, 70, 65, 80]}
          bgColor="blue"
          chartTitle="Weight (lbs)"
        />
        <PanelResizeHandle />
        <DataPanel
          title="Lift"
          data={[]}
          bgColor="yellow"
          chartTitle="Lift"
        />
      </PanelGroup>
    </div>
  );
}
