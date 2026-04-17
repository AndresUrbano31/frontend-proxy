import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const UsageChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#18181b',
        titleFont: { family: 'Outfit', size: 12, weight: 'bold' },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        cornerRadius: 12,
        borderColor: '#27272a',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#52525b', font: { size: 9, weight: '700' } },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#52525b', font: { size: 9, weight: '700' } },
      },
    },
  };

  const chartData = {
    labels: data.map(d => d.date.split('-').slice(1).join('/')),
    datasets: [
      {
        label: 'Tokens',
        data: data.map(d => d.tokens),
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 160);
          gradient.addColorStop(0, '#6366f1');
          gradient.addColorStop(1, '#6366f110');
          return gradient;
        },
        borderRadius: 8,
        barPercentage: 0.5,
      },
    ],
  };

  return (
    <div className="h-full w-full">
      <Bar options={options} data={chartData} />
    </div>
  );
};
