import React, { useState, ReactNode } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import LineChart from "./lineChart";
import Weight from "./weight/weight";
import TableComponent from "./table";

interface DataPanelProps {
  title: string;
  chartData: any[];
  bgColor: string;
  chartTitle: string;
  tableHeaders: string[];
  tableData: any[];
  children?: ReactNode;
}

const DataPanel: React.FC<DataPanelProps> = ({
  title,
  chartData: data,
  bgColor,
  chartTitle,
  tableHeaders,
  tableData,
  children,
}) => {
  const [isDefaultPane, setIsDefaultPane] = useState("chart");

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
        <div className="flex-row border-2 border-slate-800 rounded">
          <div className="flex bg-slate-900">
            <div
              onClick={() => {
                setIsDefaultPane("chart");
              }}
              className="hover:underline hover:cursor-pointer border-r-2 border-slate-800 px-2"
            >
              Chart
            </div>
            <div
              onClick={() => {
                setIsDefaultPane("data");
              }}
              className="hover:underline hover:cursor-pointer px-2"
            >
              Data
            </div>
          </div>
          <div className="p-5">
            {isDefaultPane === "chart" ? (
              <LineChart chartTitle={chartTitle} data={data} />
            ) : (
              <TableComponent headers={tableHeaders} data={tableData} />
            )}
          </div>
        </div>
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
