/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ExpenseForm from "../forms/ExpenseForm";
import { CategoryType } from "@/types/finance";

interface YearlyExpenseTableProps {
  year: number;
}

const YearlyExpenseTable: React.FC<YearlyExpenseTableProps> = ({ year }) => {
  const { expenses, categories, toggleExpensePaid } = useFinance();
  const [selectedExpense, setSelectedExpense] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const yearExpenses = expenses.filter(
    (expense) => new Date(expense.date).getFullYear() === year
  );
  
  const expenseCategories = categories.filter((cat) => cat.type === CategoryType.Expense);
  
  const tableData = expenseCategories
  .map((category) => {
    const monthlySums = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(null).map(() => []);

    yearExpenses.forEach((expense) => {
      if (expense.categoryId === category.id) {
        const month = new Date(expense.date).getMonth();
        monthlySums[month] += expense.value;
        monthlyExpenses[month].push(expense);
      }
    });

    const yearTotal = monthlySums.reduce((sum, val) => sum + val, 0);

    if (yearTotal > 0) {
      return {
        category,
        monthlySums,
        monthlyExpenses,
        yearTotal,
      };
    }

    return null;
  })
  .filter((data) => data !== null); 

  const handleExpenseClick = (expense: any) => {
    setSelectedExpense(expense.id);
    setIsDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
              Categoria
            </th>
            {monthNames.map((month, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                {month}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.category.id}>
              <td className="px-6 py-4 whitespace-nowrap border">
                <div
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${row.category.color}20`,
                    color: row.category.color,
                  }}
                >
                  {row.category.description}
                </div>
              </td>
              {row.monthlySums.map((sum, monthIndex) => (
                <td key={monthIndex} className="px-3 py-3 border">
                  <div className="text-sm">
                    {sum > 0 ? (
                      <div className="cursor-pointer" onClick={() => {
                        console.log(`Despesas de ${monthNames[monthIndex]} para ${row.category.description}:`, row.monthlyExpenses[monthIndex]);
                      }}>
                        {formatCurrency(sum)}
                      </div>
                    ) : (
                      "-"
                    )}
                  </div>
                  <div className="mt-1 space-y-1">
                    {row.monthlyExpenses[monthIndex].map((expense: any) => (
                      <div
                        key={expense.id}
                        className="flex items-center text-xs"
                      >
                        <button
                          className={`w-5 h-5 rounded-sm mr-2 border flex items-center justify-center ${
                            expense.paid
                              ? "bg-finance-primary text-white"
                              : "bg-white"
                          }`}
                          onClick={() => toggleExpensePaid(expense.id, !expense.paid)}
                        >
                          {expense.paid && <Check className="h-3 w-3" />}
                        </button>
                        <span
                          className="truncate cursor-pointer"
                          title={expense.description}
                          onClick={() => handleExpenseClick(expense)}
                        >
                          {expense.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-finance-expense font-bold border">
                {formatCurrency(row.yearTotal)}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap font-bold border">Total Mensal</td>
            {Array(12).fill(0).map((_, monthIndex) => {
              const monthTotal = tableData.reduce(
                (sum, row) => sum + row.monthlySums[monthIndex],
                0
              );
              return (
                <td key={monthIndex} className="px-6 py-4 whitespace-nowrap text-sm font-bold border">
                  {formatCurrency(monthTotal)}
                </td>
              );
            })}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold border">
              {formatCurrency(
                tableData.reduce((sum, row) => sum + row.yearTotal, 0)
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle>Editar Despesa</DialogTitle>
          {selectedExpense && (
            <ExpenseForm
              expense={expenses.find(e => e.id === selectedExpense)}
              onClose={() => {
                setIsDialogOpen(false);
                setSelectedExpense(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YearlyExpenseTable;
