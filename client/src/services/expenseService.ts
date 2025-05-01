
import api from './api';
import { Expense } from '../types/finance';

export const expenseService = {
  getAll: () => api.get<Expense[]>('/expense/allExpenses'),
  getById: (id: number) => api.get<Expense>(`/expenses/${id}`),
  create: (expense: Omit<Expense, "id">) =>
    api.post<Expense>('/expense', expense),
  update: (id: number, expense: Omit<Expense, "id">) =>
    api.put<Expense>(`/expense/${id}`, expense),
  inactiveExpenses: (ids: number[]) => api.put(`/expense/inactive`, { IdsToDelete: ids }),
  togglePaid: (id: number, paid: boolean) => 
    api.patch<Expense>(`/expense/${id}/toggle-paid`, paid),
};
