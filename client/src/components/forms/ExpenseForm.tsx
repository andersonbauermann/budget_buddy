import React, { useState, useEffect } from "react";
import { CategoryType, Expense } from "../../types/finance";
import { useFinance } from "../../context/FinanceContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ExpenseFormProps {
  expense?: Expense;
  onClose: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onClose }) => {
  const { categories, addExpense, updateExpense } = useFinance();
  const [description, setDescription] = useState(expense?.description || "");
  const [amount, setAmount] = useState(expense?.value ? expense.value.toString() : "");
  const [date, setDate] = useState(expense?.date 
    ? new Date(expense.date).toISOString().split("T")[0] 
    : new Date().toISOString().split("T")[0]);
  const [categoryId, setCategoryId] = useState(expense?.categoryId);
  const [paid, setPaid] = useState(expense?.paid || false);
  const [installments, setInstallments] = useState(expense?.installments || 1);

  const expenseCategories = categories.filter(c => c.type === CategoryType.Expense);

  useEffect(() => {
    if (expenseCategories.length > 0 && !categoryId) {
      setCategoryId(expenseCategories[0].id);
    }
  }, [expenseCategories, categoryId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error("A descrição é obrigatória");
      return;
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("O valor deve ser um número positivo");
      return;
    }
    
    if (!categoryId) {
      toast.error("Selecione uma categoria");
      return;
    }
    
    const expenseData = {
      description,
      value: Number(amount),
      date: new Date(date).toISOString(),
      categoryId,
      paid,
      installments
    };
    
    if (expense) {
      updateExpense({ ...expense, ...expenseData });
      toast.success("Despesa atualizada com sucesso");
    } else {
      addExpense(expenseData);
      toast.success("Despesa criada com sucesso");
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <input
          type="text"
          id="description"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Valor (R$)
        </label>
        <input
          type="number"
          id="amount"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
      </div>
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Data da Despesa
        </label>
        <input
          type="date"
          id="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      
      {/* <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Data de Vencimento
        </label>
        <input
          type="date"
          id="dueDate"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div> */}
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          id="category"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
          required
        >
          <option value="" disabled>Selecione uma categoria</option>
          {expenseCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.description}
            </option>
          ))}
        </select>
      </div>

      { !expense && ( <div>
        <label htmlFor="installments" className="block text-sm font-medium text-gray-700">
          Número de Parcelas
        </label>
        <input
          type="number"
          id="installments"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={installments}
          onChange={(e) => setInstallments(Number(e.target.value))}
          required
        />
      </div>) }
     
      
      { expense && (<div className="flex items-center">
        <input
          type="checkbox"
          id="paid"
          className="h-4 w-4 text-finance-primary focus:ring-finance-primary border-gray-300 rounded"
          checked={paid}
          onChange={(e) => setPaid(e.target.checked)}
        />
        <label htmlFor="paid" className="ml-2 block text-sm text-gray-700">
          Despesa paga
        </label>
      </div>)}
      
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {expense ? "Atualizar" : "Criar"} Despesa
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
