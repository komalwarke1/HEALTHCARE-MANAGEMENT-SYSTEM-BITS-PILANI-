import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Vital Signs Over Time',
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const VitalSignsChart = () => {
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: 'Blood Pressure (Systolic)',
        data: labels.map(() => Math.floor(Math.random() * (140 - 110 + 1) + 110)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Heart Rate',
        data: labels.map(() => Math.floor(Math.random() * (100 - 60 + 1) + 60)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => ({
        ...prevData,
        datasets: prevData.datasets.map(dataset => ({
          ...dataset,
          data: [...dataset.data.slice(1), Math.floor(Math.random() * (140 - 60 + 1) + 60)],
        })),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <Line options={options} data={chartData} />;
};

