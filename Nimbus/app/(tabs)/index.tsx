import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define color constants
const DEEP_BLUE = '#003366';
const WHITE = '#FFFFFF';
const ACCENT_ORANGE = '#FF9933';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: DEEP_BLUE, dark: DEEP_BLUE }}
      headerImage={
        <Ionicons size={310} name="partly-sunny" style={styles.headerImage} />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Nimbus</ThemedText>
      </ThemedView>

      <ThemedText style={styles.weatherText}>
        Check out the current weather conditions.
      </ThemedText>

      <ThemedView style={styles.weatherInfo}>
        <ThemedText type="title" style={styles.temperature}>72°F</ThemedText>
        <ThemedText type="subtitle" style={styles.locationText}>New York City</ThemedText>
        <ThemedText style={styles.conditionText}>Partly Cloudy</ThemedText>
      </ThemedView>

      <ThemedView style={styles.details}>
        <ThemedView style={styles.detailItem}>
          <Ionicons name="thermometer-outline" size={24} color={ACCENT_ORANGE} />
          <ThemedText style={styles.detailText}>Feels like: 75°F</ThemedText>
        </ThemedView>
        <ThemedView style={styles.detailItem}>
          <Ionicons name="water-outline" size={24} color={ACCENT_ORANGE} />
          <ThemedText style={styles.detailText}>Humidity: 65%</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText style={styles.forecastText}>
        This section could contain a brief forecast for the coming days.
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: WHITE,
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleText: {
    color: WHITE,
  },
  weatherText: {
    marginBottom: 20,
    color: WHITE,
  },
  weatherInfo: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingTop: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 56,
    color: ACCENT_ORANGE,
  },
  locationText: {
    color: WHITE,
  },
  conditionText: {
    color: WHITE,
  },
  details: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    color: WHITE,
  },
  forecastText: {
    color: WHITE,
  },
});
