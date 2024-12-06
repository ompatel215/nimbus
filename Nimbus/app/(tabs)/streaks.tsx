import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

const STREAK_KEY = 'userStreak';

export default function StreaksScreen() {
  const [streak, setStreak] = useState({ lastPlayedDate: '', currentStreak: 0 });
  const [markedDates, setMarkedDates] = useState({});
  const userId = 'exampleUserId';
  const { colors } = useTheme();

  const refreshStreak = async () => {
    try {
      const storedStreak = await AsyncStorage.getItem(STREAK_KEY);
      if (storedStreak) {
        const streakData = JSON.parse(storedStreak);
        setStreak(streakData);
        
        // Mark the calendar dates
        if (streakData.lastPlayedDate) {
          const dates = {};
          let currentDate = new Date(streakData.lastPlayedDate);
          
          // Mark the last streakData.currentStreak days
          for (let i = 0; i < streakData.currentStreak; i++) {
            const dateString = currentDate.toISOString().split('T')[0];
            dates[dateString] = {
              selected: true,
              selectedColor: '#4CAF50',
              marked: true,
              dotColor: '#FFD700'
            };
            currentDate.setDate(currentDate.getDate() - 1);
          }
          setMarkedDates(dates);
        }
      }
    } catch (error) {
      console.error('Error loading streak:', error);
    }
  };

  const handleResetStreak = async () => {
    try {
      await AsyncStorage.setItem(STREAK_KEY, JSON.stringify({ lastPlayedDate: '', currentStreak: 0 }));
      setMarkedDates({});
      await refreshStreak();
    } catch (error) {
      console.error('Error resetting streak:', error);
    }
  };

  useEffect(() => {
    refreshStreak();
    const interval = setInterval(refreshStreak, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Streaks</ThemedText>
      <ThemedText style={styles.streakText}>Current Streak: {streak.currentStreak} days</ThemedText>
      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: colors.background,
          textSectionTitleColor: colors.text,
          dayTextColor: colors.text,
          todayTextColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          monthTextColor: colors.text,
          textDisabledColor: '#d9e1e8',
          arrowColor: colors.text,
        }}
        markedDates={markedDates}
        markingType={'period'}
      />
      <View style={styles.buttonContainer}>
        <Button title="Reset Streak" onPress={handleResetStreak} color="red" />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
  title: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 40,
  },
  streakText: {
    fontSize: 18,
    marginBottom: 20,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
