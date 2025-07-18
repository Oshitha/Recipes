import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { useFavoritesStore } from '../stores/favoritesStore';
import { RecipeList } from '../components/RecipeList';
import { useRouter } from 'expo-router';
import { ENV } from '../config/env';

export default function FavoritesScreen() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const router = useRouter();

  const handleRecipePress = (meal: any) => {
    router.push(`/recipe/${meal.idMeal}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <View className="flex-1">
        {favorites.length === 0 ? (
          <View className="flex-1 justify-center items-center px-4">
            <Text className="text-4xl mb-4">❤️</Text>
            <Text className="text-xl font-semibold text-gray-800 mb-2 text-center">
              No Favorite Recipes Yet
            </Text>
            <Text className="text-gray-600 text-center leading-6">
              Start exploring recipes and tap the heart icon to save your favorites here!
            </Text>
          </View>
        ) : (
          <>
            <View className="px-4 py-3 bg-white border-b border-gray-200">
              <Text className="text-lg font-semibold text-gray-800">
                Your Favorite Recipes ({favorites.length})
              </Text>
            </View>
            
            <RecipeList
              meals={favorites}
              loading={false}
              onRecipePress={handleRecipePress}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
} 