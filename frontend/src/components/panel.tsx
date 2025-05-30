import DataEditor from "./table";
import React, { useState, ReactNode, useEffect } from "react";
import CalorieLineChart from "./charts/calorie";
import { read } from "./api";

interface DataPanelProps {
  title: string;
  tableName: string;
  bgColor: string;
  children?: ReactNode;
}

const DataPanel: React.FC<DataPanelProps> = ({
  title,
  tableName,
  bgColor,
  children,
}) => {
  const [isDefaultPane, setIsDefaultPane] = useState("chart");

  const [panelData, setPanelData] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await read(tableName);
        setPanelData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPanelData([]);
      }
    }
    fetchData();
  }, [tableName]);

  if (!panelData) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div>
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
              onClick={() => setIsDefaultPane("chart")}
              className="hover:underline hover:cursor-pointer border-r-2 border-slate-800 px-2"
            >
              Chart
            </div>
            <div
              onClick={() => setIsDefaultPane("data")}
              className="hover:underline hover:cursor-pointer px-2"
            >
              Data
            </div>
          </div>
          <div className="p-5 h-100">
            {isDefaultPane === "chart" ? (
              <CalorieLineChart data={panelData} />
            ) : (
              <DataEditor/>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DataPanel;
