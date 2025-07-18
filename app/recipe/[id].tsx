import React from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMealDetails } from '../hooks/useRecipes';
import { useFavoritesStore } from '../stores/favoritesStore';
import { ActivityIndicator } from 'react-native';
import { ENV } from '../config/env';
import { Meal } from '../services/api';

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: meal, isLoading, error } = useMealDetails(id as string);
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  
  // Check if current meal is favorite
  const isFavorite = (mealId: string) => favorites.some(meal => meal.idMeal === mealId);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 mt-2">Loading recipe...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !meal) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-red-500 text-center text-lg">Failed to load recipe</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView className="flex-1">
        {/* Recipe Image */}
        <View className="relative">
          <Image
            source={{ uri: meal.strMealThumb }}
            className="w-full h-64"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => {
              console.log('toggleFavorite', meal);
              toggleFavorite(meal)}}
            className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg"
          >
            <Text className={`text-2xl ${isFavorite(meal.idMeal) ? 'text-red-500' : 'text-gray-400'}`}>
              {isFavorite(meal.idMeal) ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recipe Info */}
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {meal.strMeal}
          </Text>

          <View className="flex-row mb-4">
            <View className="bg-blue-100 px-3 py-1 rounded-full mr-2">
              <Text className="text-blue-800 text-sm font-medium">
                {meal.strCategory}
              </Text>
            </View>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-800 text-sm font-medium">
                {meal.strArea}
              </Text>
            </View>
          </View>

          {/* Instructions */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Instructions
            </Text>
            <Text className="text-gray-700 leading-6">
              {meal.strInstructions}
            </Text>
          </View>

          {/* Ingredients */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Ingredients
            </Text>
            <View className="space-y-2">
              {Array.from({ length: 20 }, (_, index) => {
                const ingredientKey = `strIngredient${index + 1}` as keyof Meal;
                const measureKey = `strMeasure${index + 1}` as keyof Meal;
                const ingredient = (meal as any)[ingredientKey] as string;
                const measure = (meal as any)[measureKey] as string;
                
                if (ingredient && ingredient.trim()) {
                  return (
                    <View key={index} className="flex-row items-center bg-gray-50 p-3 rounded-lg">
                      <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                      <View className="flex-1">
                        <Text className="text-gray-800 font-medium">
                          {ingredient}
                        </Text>
                        {measure && measure.trim() && (
                          <Text className="text-gray-600 text-sm mt-1">
                            {measure}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                }
                return null;
              })}
            </View>
          </View>

          {/* Tags */}
          {meal.strTags && (
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-800 mb-3">
                Tags
              </Text>
              <View className="flex-row flex-wrap">
                {meal.strTags.split(',').map((tag, index) => (
                  <View key={index} className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
                    <Text className="text-gray-700 text-sm">
                      {tag.trim()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          

          {/* App Info */}
          <View className="mt-6 pt-4 border-t border-gray-200">
            <Text className="text-xs text-gray-500 text-center">
              {ENV.APP_NAME} - Recipe Details
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 