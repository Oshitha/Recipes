import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });
};

export const useMealsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['meals', 'category', category],
    queryFn: () => api.getMealsByCategory(category),
    enabled: !!category,
  });
};

export const useSearchMeals = (searchTerm: string) => {
  return useQuery({
    queryKey: ['meals', 'search', searchTerm],
    queryFn: () => api.searchMealsByName(searchTerm),
    enabled: searchTerm.length > 0,
  });
};

export const useMealsByFirstLetter = (letter: string) => {
  return useQuery({
    queryKey: ['meals', 'letter', letter],
    queryFn: () => api.searchMealsByFirstLetter(letter),
    enabled: letter.length === 1,
  });
};

export const useMealDetails = (mealId: string) => {
  return useQuery({
    queryKey: ['meal', mealId],
    queryFn: () => api.getMealById(mealId),
    enabled: !!mealId,
  });
}; 