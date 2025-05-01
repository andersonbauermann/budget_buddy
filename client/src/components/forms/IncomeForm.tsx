
import React, { useState, useEffect } from "react";
import { Income } from "../../types/finance";
import { useFinance } from "../../context/FinanceContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface IncomeFormProps {
  income?: Income;
  onClose: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ income, onClose }) => {
  const { categories, addIncome, updateIncome } = useFinance();
  const [description, setDescription] = useState(income?.description || "");
  const [amount, setAmount] = useState(income?.amount ? income.amount.toString() : "");
  const [date, setDate] = useState(income?.date 
    ? new Date(income.date).toISOString().split("T")[0] 
    : new Date().toISOString().split("T")[0]);
  const [categoryId, setCategoryId] = useState(income?.categoryId || "");
  const [received, setReceived] = useState(income?.received || false);

  const incomeCategories = categories.filter(c => c.type === "income");

  useEffect(() => {
    if (incomeCategories.length > 0 && !categoryId) {
      setCategoryId(incomeCategories[0].id);
    }
  }, [incomeCategories, categoryId]);

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
    
    const incomeData = {
      description,
      amount: Number(amount),
      date: new Date(date).toISOString(),
      categoryId,
      received,
    };
    
    if (income) {
      updateIncome({ ...income, ...incomeData });
      toast.success("Receita atualizada com sucesso");
    } else {
      addIncome(incomeData);
      toast.success("Receita criada com sucesso");
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
          Data
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
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          id="category"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="" disabled>Selecione uma categoria</option>
          {incomeCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="received"
          className="h-4 w-4 text-finance-primary focus:ring-finance-primary border-gray-300 rounded"
          checked={received}
          onChange={(e) => setReceived(e.target.checked)}
        />
        <label htmlFor="received" className="ml-2 block text-sm text-gray-700">
          Receita recebida
        </label>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {income ? "Atualizar" : "Criar"} Receita
        </Button>
      </div>
    </form>
  );
};

export default IncomeForm;
