
import api from './api';
import { Category } from '../types/finance';

export const categoryService = {
  getAll: () => api.get<Category[]>('category/allCategories'),
  getById: (id: string) => api.get<Category>(`/categories/${id}`),
  create: (category: Omit<Category, "id">) => 
    api.post<Category>('/category', category),
  update: (category: Category) => 
    api.post<Category>(`/category`, category),
  inactiveCategory: (id: number) => api.put(`/category/inactive/${id}`),
};
