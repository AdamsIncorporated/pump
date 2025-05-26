import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export type CalorieEntry = {
  id: number;
  created_at?: string; // or Date, if you're converting it
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
  const sortedData = [...data].sort((a, b) => {
    const         
  })

  const chartData = data.map((entry) => entry.total_calories);

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

  const [series] = useState([{ chartData }]);

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
