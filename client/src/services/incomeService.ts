
import api from './api';
import { Income } from '../types/finance';

export const incomeService = {
  getAll: () => api.get<Income[]>('income/allIncomes'),
  getById: (id: number) => api.get<Income>(`income/incomes/${id}`),
  create: (income: Omit<Income, "id">) => 
    api.post<Income>('/income', income),
  update: (id: number, income: Omit<Income, "id">) => 
    api.put<Income>(`/income/${id}`, income),
};
