import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Device } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartData = Pick<
  Device,
  "release_date" | "repairability_score" | "model_identifier"
>;

interface RepairabilityChartProps {
  data: ChartData[];
}

const RepairabilityChart: React.FC<RepairabilityChartProps> = ({ data }) => {
  //   const getFilteredData = (data: ChartData[]) => {
  //     return data.filter((d) => d.repairability_score !== null);
  //   };
  const uniqueSortedYears = Array.from(
    new Set(data.map((item) => item.release_date))
  ).sort((a, b) => Number(a) - Number(b));

  const chartData = {
    labels: uniqueSortedYears,
    datasets: [
      {
        label: "Repairability Score",
        data: data.map((d) => d.repairability_score),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBackgroundColor: "#4CAF50",
        pointBorderColor: "#fff",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"line">) {
            const modelIdentifier =
              data[tooltipItem.dataIndex].model_identifier;
            return `Model: ${modelIdentifier}, Score: ${tooltipItem.raw}`;
          },
        },
      },
      title: {
        display: true,
        text: "Repairability Score Over Time",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Release Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Repairability Score",
        },
        min: 0,
        max: 10,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default RepairabilityChart;
