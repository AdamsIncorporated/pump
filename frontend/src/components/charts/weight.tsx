import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";



type WeightLineChartProps = {
  data: WeightData;
};

const WeightLineChart: React.FC<WeightLineChartProps> = ({ data }) => {
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

  const weightValues = sortedData.map(({ weight_lbs }) =>
    typeof weight_lbs === "number" ? weight_lbs : 0
  );

  const series: ApexAxisChartSeries = [
    {
      name: "Total Weight",
      data: weightValues,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      background: "#1f2937",
      height: 400,
    },
    theme: { mode: "dark" },
    stroke: { curve: "stepline" },
    dataLabels: { enabled: false },
    title: {
      text: "Weight",
      align: "left",
      style: { color: "#F9FAFB" },
    },
    xaxis: {
      categories: dateLabels,
      labels: {
        style: { colors: "#D1D5DB" },
        trim: true,
        minHeight: 60,
        maxHeight: 80,
        offsetY: 5,
      },
    },
    yaxis: {
      labels: { style: { colors: "#D1D5DB" } },
    },
    markers: { hover: { sizeOffset: 5 } },
    grid: { borderColor: "#374151" },
  };

  return (
      <div className="bg-gray-800 p-4 rounded-xl">
        <ReactApexChart options={options} series={series} type="line" height={500} />
      </div>
  );
};

export default WeightLineChart;
