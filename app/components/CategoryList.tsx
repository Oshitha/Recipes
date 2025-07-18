import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { Category } from '../services/api';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export function CategoryList({ categories, selectedCategory, onSelectCategory }: CategoryListProps) {
  
  return (
    <View className="py-2">
      <Text className="text-lg font-bold px-4 mb-2 text-gray-800">Categories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.idCategory}
            onPress={() => onSelectCategory(category.strCategory)}
            className={`mr-3 px-4 py-2 rounded-full border ${
              selectedCategory === category.strCategory
                ? 'bg-blue-500 border-blue-500'
                : 'bg-white border-gray-300'
            }`}
          >
            <Text
              className={`font-medium ${
                selectedCategory === category.strCategory
                  ? 'text-white'
                  : 'text-gray-700'
              }`}
            >
              {category.strCategory}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 