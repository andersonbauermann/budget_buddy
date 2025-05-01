import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  Category, 
  Expense, 
  Income, 
  YearlyData,
  CategorySummary
} from "../types/finance";
import { categoryService } from "../services/categoryService";
import { expenseService } from "../services/expenseService";
import { incomeService } from "../services/incomeService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface FinanceContextType {
  categories: Category[];
  expenses: Expense[];
  incomes: Income[];
  yearlyData: YearlyData[];
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (ids: number | number[]) => void;
  toggleExpensePaid: (id: number, paid: boolean) => void;
  addIncome: (income: Omit<Income, "id">) => void;
  updateIncome: (income: Income) => void;
  deleteIncome: (id: number) => void;
  getCategoryById: (id: number) => Category | undefined;
  getExpensesByMonth: (year: number, month: number) => Expense[];
  getIncomesByMonth: (year: number, month: number) => Income[];
  getCategorySummary: (type: 'expense' | 'income', year: number, month?: number) => CategorySummary[];
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);

  // Queries
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const response = await categoryService.getAll();
        return response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    },
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      try {
        const response = await expenseService.getAll();
        return response.data;
      } catch (error) {
        console.error("Error fetching expenses:", error);
        return [];
      }
    },
  });

  const { data: incomes = [] } = useQuery({
    queryKey: ['incomes'],
    queryFn: async () => {
      try {
        const response = await incomeService.getAll();
        return response.data;
      } catch (error) {
        console.error("Error fetching incomes:", error);
        return [];
      }
    },
  });

  // Category Mutations
  const addCategoryMutation = useMutation({
    mutationFn: (category: Omit<Category, "id">) => categoryService.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Categoria criada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao criar categoria");
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (category: Category) => 
      categoryService.update(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Categoria atualizada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar categoria");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => categoryService.inactiveCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Categoria excluída com sucesso");
    },
    onError: () => {
      toast.error("Erro ao excluir categoria");
    },
  });

  // Expense Mutations
  const addExpenseMutation = useMutation({
    mutationFn: (expense: Omit<Expense, "id">) => expenseService.create(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast.success("Despesa criada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao criar despesa");
    },
  });

  const updateExpenseMutation = useMutation({
    mutationFn: (expense: Expense) => 
      expenseService.update(expense.id, expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast.success("Despesa atualizada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar despesa");
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: (ids: number | number[]) => {
      const expenseIds = Array.isArray(ids) ? ids : [ids];
      return expenseService.inactiveExpenses(expenseIds)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast.success("Despesa excluída com sucesso");
    },
    onError: () => {
      toast.error("Erro ao excluir despesa");
    },
  });

  const toggleExpensePaidMutation = useMutation({
    mutationFn: ({ id, paid }: { id: number; paid: boolean }) => 
      expenseService.togglePaid(id, paid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
    onError: () => {
      toast.error("Erro ao atualizar status da despesa");
    },
  });

  const addIncomeMutation = useMutation({
    mutationFn: (income: Omit<Income, "id">) => incomeService.create(income),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      toast.success("Receita criada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao criar receita");
    },
  });

  const updateIncomeMutation = useMutation({
    mutationFn: (income: Income) => 
      incomeService.update(income.id, income),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      toast.success("Receita atualizada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar receita");
    },
  });

  const deleteIncomeMutation = useMutation({
    mutationFn: (id: number) => incomeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      toast.success("Receita excluída com sucesso");
    },
    onError: () => {
      toast.error("Erro ao excluir receita");
    },
  });

  const calculateYearlyData = () => {
    const years = new Set<number>();
    
    // Obter todos os anos únicos dos dados
    expenses.forEach(expense => {
      const year = new Date(expense.date).getFullYear();
      years.add(year);
    });
    
    incomes.forEach(income => {
      const year = new Date(income.date).getFullYear();
      years.add(year);
    });
    
    const data: YearlyData[] = Array.from(years).map(year => {
      const yearExpenses = expenses.filter(expense => 
        new Date(expense.date).getFullYear() === year
      );
      
      const yearIncomes = incomes.filter(income => 
        new Date(income.date).getFullYear() === year
      );
      
      const totalExpense = yearExpenses.reduce((sum, expense) => sum + expense.value, 0);
      const totalIncome = yearIncomes.reduce((sum, income) => sum + income.value, 0);
      
      const monthlyData = Array(12).fill(0).map((_, monthIndex) => {
        const monthExpenses = yearExpenses.filter(expense => 
          new Date(expense.date).getMonth() === monthIndex
        );
        
        const monthIncomes = yearIncomes.filter(income => 
          new Date(income.date).getMonth() === monthIndex
        );
        
        const monthExpenseTotal = monthExpenses.reduce((sum, expense) => sum + expense.value, 0);
        const monthIncomeTotal = monthIncomes.reduce((sum, income) => sum + income.value, 0);
        
        return {
          month: monthIndex,
          expense: monthExpenseTotal,
          income: monthIncomeTotal,
          balance: monthIncomeTotal - monthExpenseTotal,
        };
      });
      
      return {
        year,
        income: totalIncome,
        expense: totalExpense,
        balance: totalIncome - totalExpense,
        monthlyData,
      };
    });
    
    setYearlyData(data);
  };

  useEffect(() => {
    calculateYearlyData();
  }, [expenses, incomes]);

  const getExpensesByMonth = (year: number, month: number) => {
    return expenses.filter(expense => {
      const date = new Date(expense.date);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  };

  const getIncomesByMonth = (year: number, month: number) => {
    return incomes.filter(income => {
      const date = new Date(income.date);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  };

  const getCategorySummary = (type: 'expense' | 'income', year: number, month?: number): CategorySummary[] => {
    const items = type === 'expense' ? expenses : incomes;
    
    const filteredItems = items.filter(item => {
      const date = new Date(item.date);
      return date.getFullYear() === year && 
        (month === undefined || date.getMonth() === month);
    });
    
    const categoryMap = new Map<number, number>();
    
    filteredItems.forEach(item => {
      const currentAmount = categoryMap.get(item.categoryId) || 0;
      categoryMap.set(item.categoryId, currentAmount + item.value);
    });
    
    const totalAmount = Array.from(categoryMap.values()).reduce((sum, amount) => sum + amount, 0);
    
    const summary: CategorySummary[] = Array.from(categoryMap.entries()).map(([categoryId, amount]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        categoryId,
        categoryName: category?.description || 'Desconhecido',
        color: category?.color || '#CCCCCC',
        amount,
        percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0,
      };
    });
    
    return summary.sort((a, b) => b.amount - a.amount);
  };

  return (
    <FinanceContext.Provider
      value={{
        categories,
        expenses,
        incomes,
        yearlyData,
        currentYear,
        setCurrentYear,
        addCategory: (category) => addCategoryMutation.mutate(category),
        updateCategory: (category) => updateCategoryMutation.mutate(category),
        deleteCategory: (id) => deleteCategoryMutation.mutate(id),
        addExpense: (expense) => addExpenseMutation.mutate(expense),
        updateExpense: (expense) => updateExpenseMutation.mutate(expense),
        deleteExpense: (ids) => deleteExpenseMutation.mutate(ids),
        toggleExpensePaid: (id, paid) => toggleExpensePaidMutation.mutate({ id, paid }),
        addIncome: (income) => addIncomeMutation.mutate(income),
        updateIncome: (income) => updateIncomeMutation.mutate(income),
        deleteIncome: (id) => deleteIncomeMutation.mutate(id),
        getCategoryById: (id) => categories.find(c => c.id === id),
        getExpensesByMonth,
        getIncomesByMonth,
        getCategorySummary,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};
