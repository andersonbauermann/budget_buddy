
import api from './api';
import { Income } from '../types/finance';

export const incomeService = {
  getAll: () => api.get<Income[]>('/incomes'),
  getById: (id: number) => api.get<Income>(`/incomes/${id}`),
  create: (income: Omit<Income, "id">) => 
    api.post<Income>('/incomes', income),
  update: (id: number, income: Omit<Income, "id">) => 
    api.put<Income>(`/incomes/${id}`, income),
  delete: (id: number) => api.delete(`/incomes/${id}`),
  toggleReceived: (id: number, received: boolean) => 
    api.patch<Income>(`/incomes/${id}/toggle-received`, { received }),
};
