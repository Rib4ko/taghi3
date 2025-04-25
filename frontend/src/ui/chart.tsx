"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartType } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface ChartProps {
    chartType: ChartType;
    data: number[];
    labels: string[];
    title: string;
}

const Chart = ({ chartType, data, labels, title }: ChartProps) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: '', data: [], backgroundColor: [], borderColor: [] }],

    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels,
            datasets: [
                {
                    label: title,
                    data,
                    backgroundColor: ['#ffbb11', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                },
            ],
        });

        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        precision: 0
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        });
    }, [data, labels, title]);

    const [currentChartType, setCurrentChartType] = useState(chartType);

    return (
        <div>
            <select value={currentChartType} onChange={(e) => setCurrentChartType(e.target.value as ChartType)}>
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
            </select>
            {currentChartType === 'bar' ? <Bar data={chartData} options={chartOptions} /> : <Pie data={chartData} options={chartOptions} />}
        </div>
    );
};

export default Chart;
