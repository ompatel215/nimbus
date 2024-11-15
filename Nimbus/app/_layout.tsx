import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    checkAuthStatus();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  if (!loaded || isAuthenticated === null) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Show login screen if not authenticated
          <Stack.Screen 
            name="login" 
            options={{ 
              gestureEnabled: false,
              // Prevent going back
              headerBackVisible: false,
            }} 
          />
        ) : (
          // Show main app screens if authenticated
          <>
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                gestureEnabled: false,
                // Prevent going back to login
                headerBackVisible: false,
              }} 
            />
            <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}
