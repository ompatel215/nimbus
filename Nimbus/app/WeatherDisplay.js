import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { fetchWeatherData } from './api';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherData = async () => {
    try {
      setError(null);
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Requesting location permission...');
      console.log('Permission status:', status);

      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      // Get the current position
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Fetch weather data
      const data = await fetchWeatherData(latitude, longitude);
      if (data.error) {
        setError(data.error);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      // Use these coordinates to fetch weather data
    })();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={getWeatherData} />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Loading weather data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weather</Text>
      <Text>Temperature: {weatherData.temperature}°{weatherData.temperatureUnit}</Text>
      <Text>Wind: {weatherData.windSpeed} {weatherData.windDirection}</Text>
      <Text>Forecast: {weatherData.shortForecast}</Text>
      <Text style={styles.detailedForecast}>{weatherData.detailedForecast}</Text>
      <Button title="Refresh" onPress={getWeatherData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  detailedForecast: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default WeatherDisplay;