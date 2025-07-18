import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Meal } from '../services/api';
import { useFavoritesStore } from '../stores/favoritesStore';

interface RecipeCardProps {
  meal: Meal;
  onPress?: () => void;
  showFavoriteButton?: boolean;
}

export function RecipeCard({ meal, onPress, showFavoriteButton = true }: RecipeCardProps) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorited = isFavorite(meal.idMeal);

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(meal);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg shadow-sm border border-gray-200 m-2 overflow-hidden flex-1"
      style={{ minHeight: 280 }}
    >
      <View className="relative">
        <Image
          source={{ uri: meal.strMealThumb }}
          className="w-full h-40"
          resizeMode="cover"
          style={{ height: 160 }}
        />
        {showFavoriteButton && (
          <TouchableOpacity
            onPress={handleFavoritePress}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-sm"
          >
            <Text className={`text-xl ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}>
              {isFavorited ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="p-3 flex-1 justify-between">
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-1" numberOfLines={2}>
            {meal.strMeal}
          </Text>
          <Text className="text-sm text-gray-600 mb-1" numberOfLines={1}>
            {meal.strCategory}
          </Text>
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {meal.strArea}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
} 