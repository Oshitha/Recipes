import { Stack } from "expo-router";
import { QueryProvider } from "./providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#1f2937',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "🍳 Recipe Finder",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="recipe/[id]"
          options={{
            title: "Recipe Details",
            headerShown: true,
          }}
        />
                  <Stack.Screen
            name="screens/favorites"
            options={{
              title: "❤️ My Favorites",
              headerShown: true,
            }}
          />
      </Stack>
    </QueryProvider>
  );
}
