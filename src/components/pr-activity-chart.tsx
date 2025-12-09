import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: 126,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: 45,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function PrActivityChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pull Request Activity</h2>
      <div className="h-64">
        <Bar options={options} data={data} />;
      </div>
    </div>
  );
}

export default PrActivityChart;
