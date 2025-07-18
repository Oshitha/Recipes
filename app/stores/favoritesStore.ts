import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../services/api';

interface FavoritesState {
  favorites: Meal[];
  addToFavorites: (meal: Meal) => void;
  removeFromFavorites: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
  toggleFavorite: (meal: Meal) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addToFavorites: (meal: Meal) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some(fav => fav.idMeal === meal.idMeal);
        
        if (!isAlreadyFavorite) {
          set({ favorites: [...favorites, meal] });
        }
      },
      
      removeFromFavorites: (mealId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(meal => meal.idMeal !== mealId) });
      },
      
      isFavorite: (mealId: string) => {
        const { favorites } = get();
        return favorites.some(meal => meal.idMeal === mealId);
      },
      
      toggleFavorite: (meal: Meal) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some(fav => fav.idMeal === meal.idMeal);
        
        if (isAlreadyFavorite) {
          set({ favorites: favorites.filter(fav => fav.idMeal !== meal.idMeal) });
        } else {
          set({ favorites: [...favorites, meal] });
        }
      },
      
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 