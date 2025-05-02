/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import IncomeForm from "../components/forms/IncomeForm";
import { toast } from "sonner";

const Income = () => {
  const { incomes, updateIncome, deleteIncome, currentYear, setCurrentYear, getCategoryById } = useFinance();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIncome, setEditIncome] = useState<any>(null);
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

  const handleAddIncome = () => {
    setEditIncome(null);
    setIsDialogOpen(true);
  };

  const handleEditIncome = (income: any) => {
    setEditIncome(income);
    setIsDialogOpen(true);
  };

  const handleDeleteIncome = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta receita?")) {
      deleteIncome(id);
      toast.success("Receita excluída com sucesso");
    }
  };

  const toggleIncomeReceived = (id: number, received: boolean) => {
    const income = incomes.find(inc => inc.id === id);
    if (income) {
      updateIncome({ ...income, received });
    }
  };

  const filteredIncomes = incomes.filter(income => {
    const incomeDate = new Date(income.date);
    return incomeDate.getFullYear() === currentYear && 
           incomeDate.getMonth() === selectedMonth;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Receitas</h1>
        <Button onClick={handleAddIncome}>Nova Receita</Button>
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
            Receitas de {monthNames[selectedMonth]} de {currentYear}
          </h2>
        </div>
        {filteredIncomes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recebido
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIncomes.map((income) => {
                  const category = getCategoryById(income.categoryId);
                  return (
                    <tr key={income.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {income.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${category?.color}20`,
                            color: category?.color,
                          }}
                        >
                          {category?.description || "Desconhecido"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm income-text">
                        {formatCurrency(income.value)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(income.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-finance-primary rounded"
                            checked={income.received}
                            onChange={(e) => toggleIncomeReceived(income.id, e.target.checked)}
                          />
                        </label>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditIncome(income)}
                          className="text-finance-primary hover:text-indigo-900 mr-3"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteIncome(income.id)}
                          className="text-finance-expense hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Nenhuma receita encontrada para este período.
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle>
            {editIncome ? "Editar Receita" : "Nova Receita"}
          </DialogTitle>
          <IncomeForm
            income={editIncome}
            onClose={() => {
              setIsDialogOpen(false);
              setEditIncome(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Income;
