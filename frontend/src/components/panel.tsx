import DataEditor from "./tables/table";
import React, { useState, ReactNode, useEffect } from "react";
import { read } from "./api";
import { FaChartBar, FaEdit } from "react-icons/fa";

interface DataPanelProps {
  title: string;
  tableName: string;
  bgColor: string;
  children?: ReactNode;
  chartObject?: React.ElementType;
}

const DataPanel: React.FC<DataPanelProps> = ({
  title,
  tableName,
  bgColor,
  children,
  chartObject,
}) => {
  const [isDefaultPane, setIsDefaultPane] = useState("chart");
  const [panelData, setPanelData] = useState<any[] | null>(null);
  let isMounted = true;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await read(tableName);
        if (isMounted) {
          setPanelData(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
          setPanelData([]);
        }
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    };
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
              className="hover:underline hover:cursor-pointer border-r-2 border-slate-800 px-2 flex items-center space-x-1"
            >
              <FaChartBar className="text-gray-300" />
              <span>Chart</span>
            </div>
            <div
              onClick={() => setIsDefaultPane("data")}
              className="hover:underline hover:cursor-pointer px-2 flex items-center space-x-1"
            >
              <FaEdit className="text-gray-300" />
              <span>Edit</span>
            </div>
          </div>
          <div className="p-5 h-100">
            {isDefaultPane === "chart" && chartObject && panelData.length > 0 ? (
              React.createElement(chartObject, { data: panelData || [] })
            ) : (
              <DataEditor data={panelData || []} />
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DataPanel;
