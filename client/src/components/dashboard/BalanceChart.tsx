
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MonthlyData } from "../../types/finance";

interface BalanceChartProps {
  data: MonthlyData[];
}

const BalanceChart: React.FC<BalanceChartProps> = ({ data }) => {
  const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const chartData = data.map(item => ({
    name: monthNames[item.month],
    Receitas: Number(item.income.toFixed(2)),
    Despesas: Number(item.expense.toFixed(2)),
    Saldo: Number(item.balance.toFixed(2)),
  }));

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="finance-card h-96">
      <h2 className="text-lg font-semibold mb-4">Balanço Mensal</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), ""]}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Legend />
          <Bar dataKey="Receitas" fill="#4CAF50" />
          <Bar dataKey="Despesas" fill="#FF5252" />
          <Bar dataKey="Saldo" fill="#3366FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
