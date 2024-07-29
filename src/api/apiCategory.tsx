// src/api/apiCategory.ts
import axios from 'axios';
import { Category } from '../interface/Category';

const API_URL = 'http://localhost:3000/categories';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
