import React, { useState } from "react";
import { Category, CategoryType } from "../../types/finance";
import { useFinance } from "../../context/FinanceContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CategoryFormProps {
  category?: Category;
  onClose: () => void;
}

const colors = [
  "#FF5252", "#FF9800", "#9C27B0", "#00BCD4", "#4CAF50",
  "#3366FF", "#2196F3", "#009688", "#FFC107", "#795548"
];

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose }) => {
  const { addCategory, updateCategory } = useFinance();
  const [description, setName] = useState(category?.description || "");
  const [type, setType] = useState<CategoryType>(category?.type as CategoryType || CategoryType.Expense);
  const [color, setColor] = useState(category?.color || colors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error("O nome da categoria é obrigatório");
      return;
    }
    
    if (category) {
      updateCategory({ ...category, description, type, color });
      toast.success("Categoria atualizada com sucesso");
    } else {
      addCategory({ description, type, color, isActive: true });
      toast.success("Categoria criada com sucesso");
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          value={description}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo</label>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              value={CategoryType.Expense}
              checked={type === CategoryType.Expense}
              onChange={() => setType(CategoryType.Expense)}
            />
            <span className="ml-2">Despesa</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              value={CategoryType.Income}
              checked={type === CategoryType.Income}
              onChange={() => setType(CategoryType.Income)}
            />
            <span className="ml-2">Receita</span>
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Cor</label>
        <div className="mt-1 flex flex-wrap gap-2">
          {colors.map((c) => (
            <div
              key={c}
              className={`h-8 w-8 rounded-full cursor-pointer border-2 ${
                color === c ? "border-blue-500" : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {category ? "Atualizar" : "Criar"} Categoria
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
