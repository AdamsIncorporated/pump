import React, { ReactNode } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import LineChart from "./lineChart";
import Weight from "./weight/weight";

interface DataPanelProps {
  title: string;
  data: number[];
  bgColor: string;
  chartTitle: string;
  children?: ReactNode;
}

const DataPanel: React.FC<DataPanelProps> = ({
  title,
  data,
  bgColor,
  chartTitle,
  children,
}) => {
  return (
    <Panel minSize={20} className="border-x-2">
      <div className="flex">
        <div className={`bg-${bgColor}-200 w-fit text-black font-bold px-5`}>
          {title}
        </div>
        <div
          className={`bg-${bgColor}-100 w-1/3 rounded-l-none rounded-r-full`}
        ></div>
      </div>
      <div className="m-5">
        <LineChart chartTitle={chartTitle} data={data} />
        {children}
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
        >
          <Weight />
        </DataPanel>
        <PanelResizeHandle />
        <DataPanel
          title="Lift"
          data={[67, 70, 65, 80]}
          bgColor="yellow"
          chartTitle="Lift"
        />
      </PanelGroup>
    </div>
  );
}
