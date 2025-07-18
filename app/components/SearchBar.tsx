import React from 'react';
import { TextInput, View, Text } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = "Search recipes..." }: SearchBarProps) {
  return (
    <View className="px-4 py-2">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="bg-gray-100 px-4 py-3 rounded-lg text-base"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
} 