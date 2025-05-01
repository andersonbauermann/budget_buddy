/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ExpenseForm from "../components/forms/ExpenseForm";
import ExpenseTable from "../components/expenses/ExpenseTable";
import { toast } from "sonner";

const Expenses = () => {
  const { expenses, toggleExpensePaid, deleteExpense, currentYear, setCurrentYear } = useFinance();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editExpense, setEditExpense] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const currentYearOptions = [];
  const currentFullYear = new Date().getFullYear();
  for (let i = currentFullYear - 5; i <= currentFullYear + 1; i++) {
    currentYearOptions.push(i);
  }

  const handleAddExpense = () => {
    setEditExpense(null);
    setIsDialogOpen(true);
  };
  
  const handleEditExpense = (expense: any) => {
    setEditExpense(expense);
    setIsDialogOpen(true);
  };
  
  const handleDeleteExpense = (id: number, expenseId?: number) => {
    const duplicateExpenses = expenses.filter((exp) => exp.expenseId === expenseId);
    const expenseIds = duplicateExpenses.length > 1 ? duplicateExpenses.map(exp => exp.id) : [id];
  
    if (duplicateExpenses.length > 1) {
      if (window.confirm("Esta despesa possui parcelas. Deseja excluir todas?")) {
        deleteExpense(expenseIds);
        toast.success("Parcelas excluídas com sucesso");
        return;
      }
  
      if (window.confirm("Deseja excluir apenas esta despesa?")) {
        deleteExpense([id]);
        toast.success("Despesa excluída com sucesso");
        return;
      }
    } else {
      if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
        deleteExpense([id]);
        toast.success("Despesa excluída com sucesso");
        return;
      }
    }

    toast.error("Exclusão cancelada");
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return  expenseDate.getFullYear() === currentYear && 
    expenseDate.getMonth() === selectedMonth;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Despesas</h1>
        <Button onClick={handleAddExpense}>Nova Despesa</Button>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-4 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ano
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
          >
            {currentYearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mês
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">
            Despesas de {monthNames[selectedMonth]} de {currentYear}
          </h2>
        </div>
        {filteredExpenses.length > 0 ? (
          <ExpenseTable
            expenses={filteredExpenses}
            onTogglePaid={toggleExpensePaid}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        ) : (
          <div className="p-8 text-center text-gray-500">
            Nenhuma despesa encontrada para este período.
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle>
            {editExpense ? "Editar Despesa" : "Nova Despesa"}
          </DialogTitle>
          <ExpenseForm
            expense={editExpense}
            onClose={() => {
              setIsDialogOpen(false);
              setEditExpense(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Expenses;
