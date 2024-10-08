import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchWeatherData } from '@/app/api'; // Import your API function
import Explore from '@/app/(tabs)/explore'; // Change back to import the original explore screen

// Define color constants
const DEEP_BLUE = '#003366';
const WHITE = '#FFFFFF';
const ACCENT_ORANGE = '#FF9933';

export default function HomeScreen() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    if (location) {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: DEEP_BLUE, dark: DEEP_BLUE }}
      headerImage={
        <Ionicons size={310} name="partly-sunny" style={styles.headerImage} />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Nimbus</ThemedText>
      </ThemedView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter location"
          placeholderTextColor="#FFFFFF" // Set placeholder text color to white
          value={location}
          onChangeText={setLocation}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {weatherData && (
        <ThemedView style={styles.weatherInfo}>
          <ThemedText type="title" style={styles.temperature}>{`${weatherData.temperature}°F`}</ThemedText>
          <ThemedText type="subtitle" style={styles.locationText}>{location}</ThemedText>
          <ThemedText type="subtitle" style={styles.conditionText}>{weatherData.condition}</ThemedText>
        </ThemedView>
      )}

      <ThemedText style={styles.weatherText}>
        Check out the current weather conditions.
      </ThemedText>

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#FFFFFF', // Set text color to white
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
