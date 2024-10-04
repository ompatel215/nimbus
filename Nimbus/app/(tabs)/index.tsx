import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Ionicons size={310} name="partly-sunny" style={styles.headerImage} />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Nimbus</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedText style={styles.weatherText}>
        Check out the current weather conditions.
      </ThemedText>

      <ThemedView style={styles.weatherInfo}>
        <ThemedText type="title" style={styles.temperature}>72°F</ThemedText>
        <ThemedText type="subtitle">New York City</ThemedText>
        <ThemedText>Partly Cloudy</ThemedText>
      </ThemedView>

      <ThemedView style={styles.details}>
        <ThemedView style={styles.detailItem}>
          <Ionicons name="thermometer-outline" size={24} />
          <ThemedText>Feels like: 75°F</ThemedText>
        </ThemedView>
        <ThemedView style={styles.detailItem}>
          <Ionicons name="water-outline" size={24} />
          <ThemedText>Humidity: 65%</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText>
        This section could contain a brief forecast for the coming days.
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#FFFFFF',
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
  weatherText: {
    marginBottom: 20, // Increased for more spacing
  },
  weatherInfo: {
    alignItems: 'center',
    marginBottom: 20, // Increased for more spacing
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
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
});
