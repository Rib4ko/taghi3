import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Chart from '../../ui/chart';
import { getTopSellingProducts } from '../../api/statistics';
import Loading from '../../components/Loading';

const TopSellingProducts = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        setError(null);
      try {
        const data = await getTopSellingProducts();
        setChartData(data);
      } catch (error) {
        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const labels = chartData.map(item => item.title);
  const data = chartData.map(item => item.totalRevenue);
  const chartType = "bar";
  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Top Selling Products</h1>
        <Chart title="Top Selling Products"  chartType={chartType} labels={labels} data={data} />
      </div>
    </AdminLayout>
  );
};

export default TopSellingProducts;