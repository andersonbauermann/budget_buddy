
import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import YearlyExpenseTable from "../components/expenses/YearlyExpenseTable";

const ExpenseList = () => {
  const { currentYear, setCurrentYear } = useFinance();

  const currentYearOptions = [];
  const currentFullYear = new Date().getFullYear();
  for (let i = currentFullYear - 5; i <= currentFullYear + 1; i++) {
    currentYearOptions.push(i);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Listagem Anual de Despesas</h1>
        <div className="w-48">
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
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Despesas de {currentYear}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Marque as caixas de seleção para indicar despesas pagas
          </p>
        </div>
        <div className="p-4 overflow-x-auto">
          <YearlyExpenseTable year={currentYear} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
