import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator, useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchWeatherData } from '@/app/api';

const DEEP_BLUE = '#003366';
const WHITE = '#FFFFFF';
const ACCENT_ORANGE = '#FF9933';

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
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? '#000000' : WHITE;
  const placeholderColor = colorScheme === 'light' ? '#555555' : '#FFFFFF';

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
        setWeatherData(data as WeatherData); 
        setError(null);
      }
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'sunny';
      case 'clouds':
        return 'cloudy';
      case 'rain':
        return 'rainy';
      case 'snow':
        return 'snow';
      case 'thunderstorm':
        return 'thunderstorm';
      default:
        return 'partly-sunny';
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: DEEP_BLUE, dark: DEEP_BLUE }}
      headerImage={
        <Ionicons
          size={310}
          name={getWeatherIcon(weatherData?.shortForecast || '')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={[styles.titleText, { color: textColor }]}>Nimbus</ThemedText>
      </ThemedView>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="Enter city name"
          placeholderTextColor={placeholderColor}
          value={location}
          onChangeText={setLocation}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {isLoading && <ActivityIndicator size="large" color={ACCENT_ORANGE} />}

      {error && (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={[styles.errorText, { color: colorScheme === 'light' ? 'red' : WHITE }]}>{error}</ThemedText>
        </ThemedView>
      )}

      {weatherData && (
        <ThemedView style={styles.weatherInfo}>
          <ThemedText type="title" style={[styles.cityName, { color: textColor }]}>
            {weatherData.cityName}
          </ThemedText>
          <ThemedText style={[styles.locationInfo, { color: textColor }]}>
            {`${weatherData.stateName}, ${weatherData.countryName}`}
          </ThemedText>
          <ThemedText type="title" style={styles.temperature}>
            {`${weatherData.temperature}°${weatherData.temperatureUnit}`}
          </ThemedText>
          <ThemedText type="subtitle" style={[styles.conditionText, { color: textColor }]}>
            {weatherData.shortForecast}
          </ThemedText>
          <ThemedText style={[styles.detailedForecast, { color: textColor }]}>
            {weatherData.detailedForecast}
          </ThemedText>
          <ThemedText style={[styles.windInfo, { color: textColor }]}>
            {`Wind: ${weatherData.windSpeed}, Direction: ${weatherData.windDirection}°`}
          </ThemedText>
          <ThemedText style={[styles.additionalInfo, { color: textColor }]}>
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
    fontSize: 16,
    color: WHITE,
    marginBottom: 10,
  },
});
