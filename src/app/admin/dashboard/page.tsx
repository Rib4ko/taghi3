"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/ui/button";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SalesData {
  month: string;
  sales: number;
}

interface ProductData {
  name: string;
  sales: number;
}

const initialSalesData: SalesData[] = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 2000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
  { month: "Jul", sales: 3490 },
];

const initialProductData: ProductData[] = [
  { name: "Engine Oil", sales: 4000 },
  { name: "Oil Filter", sales: 3000 },
  { name: "Air Filter", sales: 2000 },
  { name: "Brake Pads", sales: 2780 },
  { name: "Spark Plugs", sales: 1890 },
];

const initialCustomerData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', orders: 5, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', orders: 3, status: 'Inactive' },
];

const AdminDashboard = () => {
  const [salesData, setSalesData] = useState<SalesData[]>(initialSalesData);
  const [productData, setProductData] = useState<ProductData[]>(initialProductData);
  const [customerData, setCustomerData] = useState(initialCustomerData);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setSalesData([
        { month: "Jan", sales: 4500 },
        { month: "Feb", sales: 3200 },
        { month: "Mar", sales: 2500 },
        { month: "Apr", sales: 3000 },
        { month: "May", sales: 2000 },
        { month: "Jun", sales: 2600 },
        { month: "Jul", sales: 3800 },
      ]);

      setProductData([
        { name: "Engine Oil", sales: 4200 },
        { name: "Oil Filter", sales: 3100 },
        { name: "Air Filter", sales: 2200 },
        { name: "Brake Pads", sales: 2900 },
        { name: "Spark Plugs", sales: 2000 },
      ]);
    }, 500);
  }, []);

    const handleExportCustomers = () => {
        const doc = new jsPDF();
        (doc as any).autoTable({
            head: [['ID', 'Name', 'Email', 'Orders', 'Status']],
            body: customerData.map(customer => [customer.id, customer.name, customer.email, customer.orders, customer.status]),
        });
        doc.save('customers.pdf');
    };

  const zakatCalculation = () => {
    const businessIncome = 50000;
    const otherIncome = 10000;
    const debts = 5000;
    const zakat = 0.025 * (businessIncome + otherIncome - debts);
    return zakat;
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Chiffre d’affaires global</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">$500,000</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nombre total de commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">1,200</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clients actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">800</div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Évolution des ventes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Produits les plus vendus</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={productData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sales" fill="#8884d8" stroke="#8884d8" />
                <Line type="monotone" dataKey="sales" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zakat Calculation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Zakat: ${zakatCalculation()}</p>
          </CardContent>
        </Card>
      </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Gestion des utilisateurs</h2>
            <Button onClick={handleExportCustomers} className="mb-4">Export Customers (PDF)</Button>
            <Table>
                <TableCaption>A list of your recent customers.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customerData.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">{customer.id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.orders}</TableCell>
                            <TableCell>{customer.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    </div>
  );
};

export default AdminDashboard;
