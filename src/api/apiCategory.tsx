// src/api/apiCategory.ts
import axios from 'axios';
import { Category } from '../interface/Category';

const API_URL = 'http://localhost:3000/categories';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(API_URL);
  return response.data;
  
};
export const updateCategory = async (category: Category): Promise<Category> => {
  try {
    const response = await axios.put<Category>(`http://localhost:3000/categories/${category.id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error; // Ném lỗi lên trên để các component gọi hàm này có thể xử lý lỗi
  }
};
