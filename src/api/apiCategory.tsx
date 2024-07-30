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
    throw error; 
  }
};
export const deleteCategory = async (categoryId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${categoryId}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  };
}
