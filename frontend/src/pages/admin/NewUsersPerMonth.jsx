import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import Chart from "../../ui/chart";
import { getNewUsersPerMonth } from "../../api/statistics";
import Loading from '../../components/Loading';

const NewUsersPerMonth = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const responseData = await getNewUsersPerMonth();
                const chartLabels = responseData.map((item) => item.month);
                const chartData = responseData.map((item) => item.newUsers);
                setLabels(chartLabels);
                setData(chartData);
            } catch (error) {
                setError("Failed to load data.");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <AdminLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">New Users per Month</h1>
                <Chart chartType="bar" data={data} labels={labels} title="New Users" />
            </div>
        </AdminLayout>
    );
};

export default NewUsersPerMonth;