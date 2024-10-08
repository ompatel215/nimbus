import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'partly-sunny' : 'partly-sunny-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: 'Game',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'game-controller' : 'game-controller-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore" // Changed back from "streaks" to "explore"
        options={{
          title: 'Explore', // Updated title back to 'Explore'
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
