import React from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMealDetails } from '../hooks/useRecipes';
import { useFavoritesStore } from '../stores/favoritesStore';
import { ActivityIndicator } from 'react-native';

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: meal, isLoading, error } = useMealDetails(id as string);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

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
            onPress={() => toggleFavorite(meal)}
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

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 