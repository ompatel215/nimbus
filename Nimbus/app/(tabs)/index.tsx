import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchWeatherData } from '@/app/api'; // Import your API function

// Define color constants
const DEEP_BLUE = '#003366';
const WHITE = '#FFFFFF';
const ACCENT_ORANGE = '#FF9933';

// Define the WeatherData interface
interface WeatherData {
  cityName: string;
  stateName: string;
  countryName: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  detailedForecast: string;
  windSpeed: string;
  windDirection: string;
  humidity: number;
}

export default function HomeScreen() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (location) {
      setIsLoading(true);
      setError(null);
      const data = await fetchWeatherData(location);
      setIsLoading(false);
      if (data.error) {
        setError(data.error);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
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
          placeholder="Enter city name"
          placeholderTextColor="#FFFFFF"
          value={location}
          onChangeText={setLocation}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {isLoading && <ActivityIndicator size="large" color={ACCENT_ORANGE} />}

      {error && (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </ThemedView>
      )}

      {weatherData && (
        <ThemedView style={styles.weatherInfo}>
          <ThemedText type="title" style={styles.cityName}>
            {weatherData.cityName} {/* Display city name */}
          </ThemedText>
          <ThemedText style={styles.locationInfo}>
            {`${weatherData.stateName}, ${weatherData.countryName}`} {/* Display state and country */}
          </ThemedText>
          <ThemedText type="title" style={styles.temperature}>
            {`${weatherData.temperature}°${weatherData.temperatureUnit}`}
          </ThemedText>
          <ThemedText type="subtitle" style={styles.conditionText}>
            {weatherData.shortForecast}
          </ThemedText>
          <ThemedText style={styles.detailedForecast}>
            {weatherData.detailedForecast}
          </ThemedText>
          <ThemedText style={styles.windInfo}>
            {`Wind: ${weatherData.windSpeed}, Direction: ${weatherData.windDirection}°`}
          </ThemedText>
          <ThemedText style={styles.additionalInfo}>
            {`Humidity: ${weatherData.humidity}%`}
          </ThemedText>
        </ThemedView>
      )}
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
    color: '#FFFFFF',
  },
  errorContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
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
  conditionText: {
    color: WHITE,
  },
  detailedForecast: {
    color: WHITE,
  },
  windInfo: {
    color: WHITE,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: WHITE,
    marginBottom: 10,
  },
  additionalInfo: {
    color: WHITE,
    marginTop: 10,
  },
  locationInfo: {
    fontSize: 16, // Adjust the font size as needed
    color: WHITE,
    marginBottom: 10, // Add some space below the location info
  },
});
