import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'; // Import Text from react-native
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Calendar } from 'react-native-calendars'; // Ensure this package is installed
import { useColorScheme } from 'react-native'; // Import useColorScheme
import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = 'userStreak';

export default function StreaksScreen() {
  const colorScheme = useColorScheme(); // Get the current color scheme
  const [streak, setStreak] = useState({ lastPlayedDate: '', currentStreak: 0 });

  useEffect(() => {
    const loadStreak = async () => {
      try {
        // Clear the streak data (temporary debug measure)
        await AsyncStorage.removeItem(STREAK_KEY);
        
        const storedStreak = await AsyncStorage.getItem(STREAK_KEY);
        console.log('Stored streak:', storedStreak); // Debug log
        
        if (storedStreak) {
          const streakData = JSON.parse(storedStreak);
          console.log('Parsed streak data:', streakData); // Debug log
          setStreak(streakData);
        } else {
          const initialStreak = { lastPlayedDate: '', currentStreak: 0 };
          await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(initialStreak));
          setStreak(initialStreak);
        }
      } catch (error) {
        console.error('Error loading streak:', error);
        setStreak({ lastPlayedDate: '', currentStreak: 0 });
      }
    };
    loadStreak();
  }, []);

  // Generate calendar data based on actual streak
  const streaksData = streak.lastPlayedDate ? {
    [streak.lastPlayedDate]: { marked: true, dotColor: 'green' }
  } : {};

  console.log('Current streak state:', streak); // Debug log
  const streakCount = streak.currentStreak || 0;

  return (
    <ThemedView style={[styles.container, { backgroundColor: colorScheme === 'light' ? '#fff' : '#151718' }]}>
      <ThemedText style={styles.title}>Streaks</ThemedText>
      <ThemedText style={styles.counter}>
        Streak Count: {streakCount} <Text role="img" aria-label="fire">🔥</Text>
      </ThemedText>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={streaksData}
          theme={{
            backgroundColor: colorScheme === 'light' ? '#fff' : '#151718', // Set background color based on the scheme
            calendarBackground: colorScheme === 'light' ? '#fff' : '#2C2F33', // Set calendar background based on the scheme
            todayTextColor: 'orange',
            arrowColor: 'orange',
            monthTextColor: colorScheme === 'light' ? '#000' : '#fff', // Month text color
            textDayFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16,
            dayTextColor: colorScheme === 'light' ? '#000' : '#fff', // Day text color
            textSectionTitleColor: colorScheme === 'light' ? '#000' : '#fff', // Title color
            selectedDayBackgroundColor: 'orange',
            selectedDayTextColor: '#fff',
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 18,
    marginBottom: 20,
  },
  calendarContainer: {
    width: '100%',
  },
});
