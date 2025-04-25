import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Chart from '../../ui/chart';
import { getOrdersByStatus } from '../../api/statistics';

const OrdersByStatus = () => {
    const [chartType, setChartType] = useState('bar');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOrdersByStatus();

                // format the data
                const formattedData = data.map((item) => ({
                    status: item._id,
                    count: item.count,
                }))

                setData(formattedData)


                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const chartData = data.map((item) => item.count);
    const chartLabels = data.map((item) => item.status);

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <AdminLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Orders by Status</h1>
                <div className="mb-4">
                    <label htmlFor="chartType" className="mr-2">Chart Type:</label>
                    <select id="chartType" value={chartType} onChange={handleChartTypeChange} className="p-2 border rounded">
                        <option value="bar">Bar</option>
                        <option value="pie">Pie</option>
                    </select>
                </div>
                <Chart 
                    chartType={chartType}
                    data={chartData}
                    labels={chartLabels}
                    title="Orders by Status"
                />
            </div>
        </AdminLayout>
    );
};

export default OrdersByStatus;