export enum CategoryType {
  Expense = 1,
  Income = 2
}

export interface Category {
  id: number;
  description: string;
  type: CategoryType;
  color: string;
  isActive: boolean;
}

export interface Expense {
  id: number;
  expenseId?: number;
  description: string;
  value: number;
  date: string;
  categoryId: number;
  paid: boolean;
  installments: number;
}

export interface Income {
  id: number;
  description: string;
  value: number;
  date: string;
  categoryId: number;
  received: boolean;
  isActive: boolean;
}

export interface MonthlyData {
  month: number;
  income: number;
  expense: number;
  balance: number;
}

export interface YearlyData {
  year: number;
  income: number;
  expense: number;
  balance: number;
  monthlyData: MonthlyData[];
}

export interface CategorySummary {
  categoryId: number;
  categoryName: string;
  color: string;
  amount: number;
  percentage: number;
}
