import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchWeatherData } from '@/app/api';

// Define a type for the weather data
type WeatherData = {
  temperature?: number;
  temperatureUnit?: string;
  error?: string;
};

const cities = {
  easy: ['Los Angeles', 'New York', 'Chicago', 'Philadelphia', 'Houston', 'Dallas', 'Atlanta', 'Miami'],
  medium: ['San Francisco', 'Miami', 'Seattle', 'Denver', 'Boston', 'Phoenix', 'Orlando'],
  hard: ['Anchorage', 'Honolulu', 'Phoenix', 'Salt Lake City', 'Boise', 'Santa Fe', 'Little Rock'],
};

export default function GameScreen() {
  const navigation = useNavigation();
  const [difficulty, setDifficulty] = useState<keyof typeof cities | null>(null);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state
  const [guess, setGuess] = useState(''); // State for user input

  const startGame = async (level: keyof typeof cities) => {
    setDifficulty(level);
    const randomCity = cities[level][Math.floor(Math.random() * cities[level].length)];
    setCity(randomCity);
    setWeatherData(null);
    setLoading(true); // Set loading to true

    // Fetch weather data for the selected city
    const data = await fetchWeatherData(randomCity);
    setLoading(false); // Set loading to false after fetching
    if (data.error) {
      Alert.alert('Error', data.error);
      return;
    }
    setWeatherData(data);
  };

  const generateTemperatureOptions = (actualTemp: number) => {
    const options = new Set<number>(); // Use a Set to avoid duplicates
    const range = 10; // Range for temperature options

    // Ensure the actual temperature is included
    options.add(actualTemp);

    // Generate additional options within the range
    for (let i = actualTemp - range; i <= actualTemp + range; i += 5) {
      options.add(i);
    }

    // Convert Set to Array and shuffle
    const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);

    // Return the first four options
    return optionsArray.slice(0, 4);
  };

  const checkGuess = async (userGuess: number) => {
    if (!weatherData || !weatherData.temperature) return;

    const actualTemp = weatherData.temperature;

    const resetGame = () => {
      setDifficulty(null);
      setCity('');
      setWeatherData(null);
      setGuess(''); // Reset the guess input
    };

    if (Math.abs(actualTemp - userGuess) <= 3) {
      setCorrectGuesses(correctGuesses + 1);
      Alert.alert('Correct!', `You guessed within 3 degrees! The actual temperature is ${actualTemp}°${weatherData.temperatureUnit}.`, [
        { text: 'OK', onPress: resetGame }
      ]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
      Alert.alert('Incorrect', `The actual temperature is ${actualTemp}°${weatherData.temperatureUnit}.`, [
        { text: 'OK', onPress: resetGame }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {!difficulty ? (
          <>
            <ThemedText style={styles.title}>Choose Difficulty</ThemedText>
            <Button title="Easy" onPress={() => startGame('easy')} />
            <Button title="Medium" onPress={() => startGame('medium')} />
            <Button title="Hard" onPress={() => startGame('hard')} />
            <ThemedText>Correct Guesses: {correctGuesses}</ThemedText>
            <ThemedText>Incorrect Guesses: {incorrectGuesses}</ThemedText>
          </>
        ) : (
          <>
            <ThemedText style={styles.title}>Guess the Temperature in {city}</ThemedText>
            {loading ? ( // Show loading indicator while fetching data
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {difficulty === 'easy' && weatherData && weatherData.temperature ? (
                  generateTemperatureOptions(weatherData.temperature).map((temp) => (
                    <Button key={temp} title={`${temp}°F`} onPress={() => checkGuess(temp)} />
                  ))
                ) : (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your guess in degrees Fahrenheit"
                      keyboardType="numeric"
                      value={guess}
                      onChangeText={setGuess}
                    />
                    {weatherData && ( // Only show the submit button if weather data is available
                      <Button title="Submit Guess" onPress={() => checkGuess(Number(guess))} />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </ThemedView>
    </TouchableWithoutFeedback>
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    color: '#000000', // Text color
    backgroundColor: '#FFFFFF', // Background color
  },
});
