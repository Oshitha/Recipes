import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { RecipeCard } from './RecipeCard';
import { Meal } from '../services/api';

interface RecipeListProps {
  meals: Meal[];
  loading?: boolean;
  error?: string | null;
  onRecipePress?: (meal: Meal) => void;
}

export function RecipeList({ meals, loading, error, onRecipePress }: RecipeListProps) {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-2">Loading recipes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-red-500 text-center text-lg">{error}</Text>
      </View>
    );
  }

  if (meals.length === 0) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-gray-500 text-center text-lg">No recipes found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <RecipeCard
          meal={item}
          onPress={() => onRecipePress?.(item)}
        />
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
    />
  );
} 