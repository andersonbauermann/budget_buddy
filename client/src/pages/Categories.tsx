/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CategoryForm from "../components/forms/CategoryForm";
import { toast } from "sonner";
import { CategoryType } from "@/types/finance";

const Categories = () => {
  const { categories, deleteCategory } = useFinance();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<CategoryType>(CategoryType.Expense);

  const handleAddCategory = () => {
    setEditCategory(null);
    setIsDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setEditCategory(category);
    setIsDialogOpen(true);
  };

  const handleDeleteCategory = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      deleteCategory(id);
      toast.success("Categoria excluída com sucesso");
    }
  };

  const filteredCategories = categories?.filter(
    (category) => category.type === activeTab
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <Button onClick={handleAddCategory}>Nova Categoria</Button>
      </div>

      <div className="flex space-x-2 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === CategoryType.Expense
              ? "border-b-2 border-finance-primary text-finance-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(CategoryType.Expense)}
        >
          Despesas
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === CategoryType.Income
              ? "border-b-2 border-finance-primary text-finance-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(CategoryType.Income)}
        >
          Receitas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="finance-card flex items-center justify-between"
          >
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full mr-3"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="font-medium">{category.description}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditCategory(category)}
                className="text-finance-primary hover:text-indigo-900"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-finance-expense hover:text-red-900"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle>
            {editCategory ? "Editar Categoria" : "Nova Categoria"}
          </DialogTitle>
          <CategoryForm
            category={editCategory}
            onClose={() => {
              setIsDialogOpen(false);
              setEditCategory(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
