import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

type LineChartProps = {
    chartTitle: string,
    data: Array<number>
}

const LineChart: React.FC<LineChartProps> = ({chartTitle, data}) => {
  const [state, setState] = useState({
    series: [
      {
        data: data,
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        background: "#1f2937", // Tailwind gray-800
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
        text: chartTitle,
        align: "left",
        style: {
          color: "#F9FAFB", // Tailwind gray-100
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: "#D1D5DB", // Tailwind gray-300
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#D1D5DB", // Tailwind gray-300
          },
        },
      },
      markers: {
        hover: {
          sizeOffset: 4,
        },
      },
      grid: {
        borderColor: "#374151", // Tailwind gray-700
      },
    },
  });

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
