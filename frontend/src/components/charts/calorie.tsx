import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { read } from "../api";

export type CalorieEntry = {
  id: number;
  created_at?: string;
  carbs?: number;
  protein?: number;
  saturated_fat?: number;
  trans_fat?: number;
  monounsaturated_fat?: number;
  polyunsaturated_fat?: number;
  total_calories: number;
};

export type CalorieData = Array<CalorieEntry>;

type CalorieLineChartProps = {
  data: CalorieData;
};

const CalorieLineChart: React.FC<CalorieLineChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">No data to display</div>
    );
  }

  const sortedData = [...data].sort((a, b) => {
    const firstDate = new Date(a.created_at || "").getTime();
    const secondDate = new Date(b.created_at || "").getTime();
    return firstDate - secondDate;
  });

  const calorieValues = sortedData.map((entry) => entry.total_calories);
  const dateLabels = sortedData.map((entry) => entry.created_at || "");

  const [series] = useState([
    {
      name: "Total Calories",
      data: calorieValues,
    },
  ]);

  const [options] = useState<ApexOptions>({
    chart: {
      type: "line",
      height: 350,
      background: "#1f2937",
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: "dark",
    },
    stroke: {
      curve: "stepline",
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Calories",
      align: "left",
      style: {
        color: "#F9FAFB",
      },
    },
    xaxis: {
      categories: dateLabels,
      labels: {
        style: {
          colors: "#D1D5DB",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#D1D5DB",
        },
      },
    },
    markers: {
      hover: {
        sizeOffset: 4,
      },
    },
    grid: {
      borderColor: "#374151",
    },
  });

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default CalorieLineChart;
