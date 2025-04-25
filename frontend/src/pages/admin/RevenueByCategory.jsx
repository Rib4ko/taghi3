import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Chart from '../../ui/chart';
import { getRevenueByCategory } from '../../api/statistics';

const RevenueByCategory = () => {
    const [chartType, setChartType] = useState('bar');
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getRevenueByCategory();
                setRevenueData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const data = revenueData.map(item => item.totalRevenue);
    const labels = revenueData.map(item => item.category);


    const chartData = {
        labels: data.map((item) => item.category),
        datasets: [
            {
                label: 'Revenue',
                data: data.map((item) => item.revenue),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const chartOptions = [
        { value: 'bar', label: 'Bar Chart' },
        { value: 'pie', label: 'Pie Chart' },
    ];
    return (
        <AdminLayout>            <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Revenue by Category</h1>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
                <>
                    {labels.length > 0 ? (
                        <>
                            <select
                                className="p-2 border rounded-lg mb-4"
                                value={chartType}
                                onChange={(e) => setChartType(e.target.value)}
                            >
                                {chartOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                        
                            {chartOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                            <Chart chartType={chartType} data={data} labels={labels} title="Revenue By Category" />
                        </>
                    ) : (
                        <div>No data available</div>
                    )}
                </>
            )}
        </div>
    </AdminLayout>
    );
};
export default RevenueByCategory;