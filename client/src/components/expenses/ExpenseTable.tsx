
import React from "react";
import { Expense } from "../../types/finance";
import { useFinance } from "../../context/FinanceContext";

interface ExpenseTableProps {
  expenses: Expense[];
  onTogglePaid: (id: number, paid: boolean) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number, expenseId?: number) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onTogglePaid,
  onEdit,
  onDelete,
}) => {
  const { getCategoryById } = useFinance();

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
              Pago
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => {
            const category = getCategoryById(expense.categoryId);
            return (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {expense.description}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-finance-expense">
                  {formatCurrency(expense.value)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(expense.date)}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expense.dueDate ? formatDate(expense.dueDate) : "N/A"}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-finance-primary rounded"
                      checked={expense.paid}
                      onChange={(e) => onTogglePaid(expense.id, e.target.checked)}
                    />
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(expense)}
                    className="text-finance-primary hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(expense.id, expense.expenseId)}
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
  );
};

export default ExpenseTable;
