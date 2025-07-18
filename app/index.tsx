import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchBar } from './components/SearchBar';
import { CategoryList } from './components/CategoryList';
import { RecipeList } from './components/RecipeList';
import { useCategories, useMealsByCategory, useSearchMeals, useMealsByFirstLetter } from './hooks/useRecipes';
import { useFavoritesStore } from './stores/favoritesStore';
import { Meal } from './services/api';
import { ENV } from './config/env';
import "../global.css";

export default function Index() {
  const router = useRouter();
  const favorites = useFavoritesStore((state) => state.favorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState('a');

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Auto-select first category when categories are loaded and no search term
  useEffect(() => {
    if (categories.length > 0 && !searchTerm && !selectedCategory) {
      setSelectedCategory(categories[0].strCategory);
    }
  }, [categories, searchTerm, selectedCategory]);

  // Fetch meals based on search or category
  const { data: searchResults = [], isLoading: searchLoading } = useSearchMeals(searchTerm);
  const { data: categoryResults = [], isLoading: categoryLoading } = useMealsByCategory(selectedCategory || '');
  const { data: letterResults = [], isLoading: letterLoading } = useMealsByFirstLetter(selectedLetter);


  // Determine which data to show
  let meals: Meal[] = [];
  let isLoading = false;

  if (searchTerm.length > 0) {
    meals = searchResults;
    isLoading = searchLoading;
  } else if (selectedCategory) {
    meals = categoryResults;
    isLoading = categoryLoading;
  } else {
    meals = letterResults;
    isLoading = letterLoading;
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSearchTerm(''); // Clear search when selecting category
  };

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    if (text.length > 0) {
      setSelectedCategory(null); // Clear category when searching
    }
  };

  const handleRecipePress = (meal: Meal) => {
    router.push(`/recipe/${meal.idMeal}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800">🍳 {ENV.APP_NAME}</Text>
            <Text className="text-gray-600 mt-1">Discover delicious recipes from around the world</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/screens/favorites' as any)}
            className="bg-red-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">
              ❤️ {favorites.length}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <SearchBar
        value={searchTerm}
        onChangeText={handleSearchChange}
        placeholder="Search for recipes..."
      />

      {/* Categories */}
      
      {!searchTerm && (
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      )}

      {/* Recipe List */}
      <View className="flex-1">
        {!searchTerm && !selectedCategory && (
          <View className="px-4 py-2">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Recipes starting with '{selectedLetter.toUpperCase()}'
            </Text>
          </View>
        )}
        
        {searchTerm && (
          <View className="px-4 py-2">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Search results for "{searchTerm}"
            </Text>
          </View>
        )}

        {selectedCategory && (
          <View className="px-4 py-2">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              {selectedCategory} recipes
            </Text>
          </View>
        )}

        <RecipeList
          meals={meals}
          loading={isLoading}
          onRecipePress={handleRecipePress}
        />
      </View>
    </SafeAreaView>
  );
}
