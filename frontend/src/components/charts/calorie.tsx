import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

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

export type CalorieData = CalorieEntry[];

type CalorieLineChartProps = {
  data: CalorieData;
};

const CalorieLineChart: React.FC<CalorieLineChartProps> = ({ data }) => {
  if (!data?.length) {
    return (
      <div className="p-4 text-center text-gray-400">
        No data to display
      </div>
    );
  }

  // Sort data by date ascending, safely parse dates
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.created_at ?? 0).getTime();
    const dateB = new Date(b.created_at ?? 0).getTime();
    return dateA - dateB;
  });

  // Extract labels and series data
  const dateLabels = sortedData.map(({ created_at }) => {
    if (!created_at) return "";
    return new Date(created_at).toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      year: "numeric",
    });
  });

  const calorieValues = sortedData.map(({ total_calories }) => total_calories);

  const series = [
    {
      name: "Total Calories",
      data: calorieValues,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      background: "#1f2937",
    },
    theme: { mode: "dark" },
    stroke: { curve: "stepline" },
    dataLabels: { enabled: false },
    title: {
      text: "Calories",
      align: "left",
      style: { color: "#F9FAFB" },
    },
    xaxis: {
      categories: dateLabels,
      labels: { style: { colors: "#D1D5DB" } },
    },
    yaxis: {
      labels: { style: { colors: "#D1D5DB" } },
    },
    markers: { hover: { sizeOffset: 4 } },
    grid: { borderColor: "#374151" },
  };

  return (
    <div className="overflow-auto h-100">
      <div className="bg-gray-800 p-4 rounded-xl">
        <ReactApexChart options={options} series={series} type="line" />
      </div>
    </div>
  );
};

export default CalorieLineChart;
