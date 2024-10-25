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
      const storedStreak = await AsyncStorage.getItem(STREAK_KEY);
      if (storedStreak) {
        setStreak(JSON.parse(storedStreak));
      }
    };
    loadStreak();
  }, []);

  const updateStreak = async (correctGuess: boolean) => {
    const today = new Date().toISOString().split('T')[0];

    if (correctGuess) {
      if (streak.lastPlayedDate === today) {
        // User has already played today, increment the streak
        setStreak((prev) => ({ ...prev, currentStreak: prev.currentStreak + 1 }));
      } else {
        // User has not played today, update the last played date
        setStreak({ lastPlayedDate: today, currentStreak: 1 });
      }
    } else {
      // Reset streak logic can be added here if needed
    }

    // Save the updated streak to AsyncStorage
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  };

  // Sample data for streaks
  const streaksData = {
    '2023-10-01': { marked: true, dotColor: 'green' }, // Completed streak
    '2023-10-02': { marked: true, dotColor: 'red' },   // Missed streak
    '2023-10-03': { marked: true, dotColor: 'green' }, // Completed streak
    '2023-10-04': { marked: true, dotColor: 'red' },   // Missed streak
    '2023-10-05': { marked: true, dotColor: 'green' }, // Completed streak
  };

  const streakCount = streak.currentStreak; // Use the current streak from state

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
