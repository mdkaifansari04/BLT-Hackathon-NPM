import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { DailyActivity } from "../hooks/useGithubApi";
import { GithubPR } from "../../types/github/pr";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PrActivityChartProps {
  dailyActivity: Record<string, DailyActivity>;
  prs: GithubPR[];
}

const PrActivityChart: React.FC<PrActivityChartProps> = ({ dailyActivity, prs }) => {
  // Generate colors for repositories - matching original implementation
  const generateColors = (count: number): string[] => {
    const colors = [
      "rgba(239, 68, 68, 0.8)", // red
      "rgba(59, 130, 246, 0.8)", // blue
      "rgba(34, 197, 94, 0.8)", // green
      "rgba(249, 115, 22, 0.8)", // orange
      "rgba(168, 85, 247, 0.8)", // purple
      "rgba(236, 72, 153, 0.8)", // pink
      "rgba(14, 165, 233, 0.8)", // sky
      "rgba(132, 204, 22, 0.8)", // lime
      "rgba(251, 146, 60, 0.8)", // amber
      "rgba(192, 132, 252, 0.8)", // violet
      "rgba(244, 63, 94, 0.8)", // rose
    ];

    // If we need more colors than predefined, generate random ones
    const MIN_COLOR_VALUE = 55;
    const COLOR_RANGE = 200;
    while (colors.length < count) {
      const r = Math.floor(Math.random() * COLOR_RANGE + MIN_COLOR_VALUE);
      const g = Math.floor(Math.random() * COLOR_RANGE + MIN_COLOR_VALUE);
      const b = Math.floor(Math.random() * COLOR_RANGE + MIN_COLOR_VALUE);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.8)`);
    }
    return colors.slice(0, count);
  };

  // Process data for chart - matching original implementation
  const dates = Object.keys(dailyActivity).sort();

  // Get unique repositories from PRs
  const repositories = [...new Set(prs.map((pr) => pr.repository))];

  // Pre-process PRs into a Map for O(1) lookups: date -> repo -> count
  const prsByDateAndRepo = new Map<string, Map<string, number>>();
  prs.forEach((pr) => {
    if (!pr.merged_at) return;
    // Use merged_at date since we're showing merged PRs
    const prDate = new Date(pr.merged_at).toISOString().split("T")[0];
    if (!prsByDateAndRepo.has(prDate)) {
      prsByDateAndRepo.set(prDate, new Map());
    }
    const dateMap = prsByDateAndRepo.get(prDate)!;
    const currentCount = dateMap.get(pr.repository) || 0;
    dateMap.set(pr.repository, currentCount + 1);
  });

  // Create datasets for each repository
  const repoColors = generateColors(repositories.length);
  const datasets = repositories.map((repo, index) => {
    const data = dates.map((date) => {
      const dateMap = prsByDateAndRepo.get(date);
      return dateMap ? dateMap.get(repo) || 0 : 0;
    });

    return {
      label: repo,
      data: data,
      backgroundColor: repoColors[index],
      borderColor: repoColors[index],
      borderWidth: 1,
    };
  });

  const chartData = {
    labels: dates,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Merged Pull Requests",
        },
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pull Request Activity</h2>
      <div className="h-96">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PrActivityChart;
