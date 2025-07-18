import axios from 'axios';
import { ENV } from '../config/env';

const BASE_URL = ENV.API_BASE_URL;

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  // Dynamic ingredient fields
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  // Dynamic measure fields
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface ApiResponse<T> {
  meals?: T[] | null;
  categories?: T[] | null;
}

export const api = {
  // Search meals by first letter
  searchMealsByFirstLetter: async (letter: string): Promise<Meal[]> => {
    const response = await axios.get<ApiResponse<Meal>>(`${BASE_URL}/search.php?f=${letter}`);
    return response.data.meals || [];
  },

  // Search meals by name
  searchMealsByName: async (name: string): Promise<Meal[]> => {
    const response = await axios.get<ApiResponse<Meal>>(`${BASE_URL}/search.php?s=${name}`);
    return response.data.meals || [];
  },

  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await axios.get<ApiResponse<Category>>(`${BASE_URL}/categories.php`);
    return response.data.categories || [];
  },

  // Get meals by category
  getMealsByCategory: async (category: string): Promise<Meal[]> => {
    const response = await axios.get<ApiResponse<Meal>>(`${BASE_URL}/filter.php?c=${category}`);
    return response.data.meals || [];
  },

  // Get meal details by ID
  getMealById: async (id: string): Promise<Meal | null> => {
    const response = await axios.get<ApiResponse<Meal>>(`${BASE_URL}/lookup.php?i=${id}`);
    console.log("API Response for meal:", id, response.data);
    return response.data.meals?.[0] || null;
  },
}; 