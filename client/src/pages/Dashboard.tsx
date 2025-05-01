
import React from "react";
import { useFinance } from "../context/FinanceContext";
import CardStat from "../components/common/CardStat";
import BalanceChart from "../components/dashboard/BalanceChart";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";

const Dashboard = () => {
  const { yearlyData, getCategorySummary, currentYear } = useFinance();
  
  const currentYearData = yearlyData.find(data => data.year === currentYear);
  
  // Calcular o percentual de variação em relação ao mês anterior
  const calculateMonthlyChange = (data: any) => {
    if (!data || !data.monthlyData) return null;
    
    const currentMonth = new Date().getMonth();
    
    if (currentMonth === 0) return null; // Janeiro não tem mês anterior
    
    const currentMonthData = data.monthlyData[currentMonth];
    const previousMonthData = data.monthlyData[currentMonth - 1];
    
    if (!currentMonthData || !previousMonthData) return null;
    
    const incomeChange = previousMonthData.income !== 0
      ? ((currentMonthData.income - previousMonthData.income) / previousMonthData.income) * 100
      : 0;
      
    const expenseChange = previousMonthData.expense !== 0
      ? ((currentMonthData.expense - previousMonthData.expense) / previousMonthData.expense) * 100
      : 0;
      
    const balanceChange = previousMonthData.balance !== 0
      ? ((currentMonthData.balance - previousMonthData.balance) / Math.abs(previousMonthData.balance)) * 100
      : 0;
    
    return {
      incomeChange,
      expenseChange,
      balanceChange,
    };
  };
  
  const monthlyChange = currentYearData ? calculateMonthlyChange(currentYearData) : null;
  
  // Dados para os gráficos de categorias
  const expenseCategorySummary = getCategorySummary("expense", currentYear);
  const incomeCategorySummary = getCategorySummary("income", currentYear);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardStat
          title="Receitas Anuais"
          value={currentYearData?.income || 0}
          type="income"
          change={monthlyChange?.incomeChange || 0}
        />
        <CardStat
          title="Despesas Anuais"
          value={currentYearData?.expense || 0}
          type="expense"
          change={monthlyChange?.expenseChange || 0}
        />
        <CardStat
          title="Saldo Anual"
          value={currentYearData?.balance || 0}
          type={currentYearData?.balance && currentYearData.balance >= 0 ? "income" : "expense"}
          change={monthlyChange?.balanceChange || 0}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart data={currentYearData?.monthlyData || []} />
        <div className="grid grid-cols-1 gap-6">
          <CategoryPieChart 
            data={expenseCategorySummary} 
            title="Despesas por Categoria" 
          />
          <CategoryPieChart 
            data={incomeCategorySummary} 
            title="Receitas por Categoria" 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
