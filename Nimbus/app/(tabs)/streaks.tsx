import React from 'react';
import { StyleSheet, View, Text } from 'react-native'; // Import Text from react-native
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Calendar } from 'react-native-calendars'; // Ensure this package is installed

export default function StreaksScreen() {
  // Sample data for streaks
  const streaksData = {
    '2023-10-01': { marked: true, dotColor: 'green' }, // Completed streak
    '2023-10-02': { marked: true, dotColor: 'red' },   // Missed streak
    '2023-10-03': { marked: true, dotColor: 'green' }, // Completed streak
    '2023-10-04': { marked: true, dotColor: 'red' },   // Missed streak
    '2023-10-05': { marked: true, dotColor: 'green' }, // Completed streak
  };

  const streakCount = Object.keys(streaksData).length; // Count of streak days

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Streaks</ThemedText>
      <ThemedText style={styles.counter}>
        Streak Count: {streakCount} <Text role="img" aria-label="fire">🔥</Text>
      </ThemedText>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={streaksData}
          theme={{
            backgroundColor: '#151718', // Darker background for the calendar
            calendarBackground: '#2C2F33', // Darker calendar background
            todayTextColor: 'orange',
            arrowColor: 'orange',
            monthTextColor: 'orange',
            textDayFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16,
            'stylesheet.calendar.header': {
              dayTextAtIndex: {
                color: 'orange',
              },
            },
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
    backgroundColor: '#151718', // Match the background color with other screens
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // Ensure text is visible on dark background
  },
  counter: {
    fontSize: 18,
    marginBottom: 20,
    color: '#FFFFFF', // Ensure text is visible on dark background
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%', // Full width for the calendar
  },
});
