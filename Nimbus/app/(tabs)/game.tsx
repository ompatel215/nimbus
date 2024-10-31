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
  const [temperatureOptions, setTemperatureOptions] = useState<number[]>([]);

  const startGame = async (level: keyof typeof cities) => {
    setDifficulty(level);
    await fetchNewCity(level);
  };

  const fetchNewCity = async (level: keyof typeof cities) => {
    const randomCity = cities[level][Math.floor(Math.random() * cities[level].length)];
    setCity(randomCity);
    setWeatherData(null);
    setLoading(true);

    const data = await fetchWeatherData(randomCity);
    setLoading(false);
    if (data.error) {
      Alert.alert('Error', data.error);
      return;
    }
    setWeatherData(data);

    // Generate temperature options for easy mode
    if (level === 'easy') {
      generateTemperatureOptions(data.temperature);
    }
  };

  const generateTemperatureOptions = (actualTemp: number) => {
    const options = new Set<number>();
    options.add(actualTemp); // Include the actual temperature

    // Generate random temperatures
    while (options.size < 4) {
      const randomTemp = Math.floor(Math.random() * (actualTemp + 10 - (actualTemp - 10))) + (actualTemp - 10);
      options.add(randomTemp);
    }

    setTemperatureOptions(Array.from(options).sort(() => Math.random() - 0.5)); // Shuffle options
  };

  const checkGuess = async (userGuess: number) => {
    if (!weatherData || !weatherData.temperature) return;

    const actualTemp = weatherData.temperature;

    if (Math.abs(actualTemp - userGuess) <= 3) {
      setCorrectGuesses(correctGuesses + 1);
      Alert.alert('Correct!', `You guessed within 3 degrees! The actual temperature is ${actualTemp}°${weatherData.temperatureUnit}.`, [
        { text: 'OK', onPress: () => fetchNewCity(difficulty) }
      ]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
      Alert.alert('Incorrect', `The actual temperature is ${actualTemp}°${weatherData.temperatureUnit}.`, [
        { text: 'OK', onPress: () => fetchNewCity(difficulty) }
      ]);
    }
    
    // Clear the guess input field after checking the guess
    setGuess('');
  };

  const handleTemperatureGuess = (userGuess: number) => {
    checkGuess(userGuess);
  };

  const exitGame = () => {
    setDifficulty(null);
    setCity('');
    setWeatherData(null);
    setGuess('');
    setCorrectGuesses(0);
    setIncorrectGuesses(0);
    setTemperatureOptions([]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {!difficulty ? (
          <>
            <ThemedText style={styles.title}>Choose Difficulty</ThemedText>
            <View style={styles.buttonContainer}>
              <View style={styles.roundButton}>
                <Button title="Easy" onPress={() => startGame('easy')} color="#fff" />
              </View>
              <View style={styles.roundButton}>
                <Button title="Medium" onPress={() => startGame('medium')} color="#fff" />
              </View>
              <View style={styles.roundButton}>
                <Button title="Hard" onPress={() => startGame('hard')} color="#fff" />
              </View>
            </View>
          </>
        ) : (
          <>
            <ThemedText style={styles.title}>Guess the Temperature in {city}</ThemedText>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {difficulty === 'easy' ? (
                  <View style={styles.optionsContainer}>
                    {temperatureOptions.map((temp) => (
                      <View key={temp} style={styles.optionButton}>
                        <Button title={`${temp}°`} onPress={() => handleTemperatureGuess(temp)} color="#ffffff" />
                      </View>
                    ))}
                  </View>
                ) : (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your guess in degrees Fahrenheit"
                      keyboardType="numeric"
                      value={guess}
                      onChangeText={setGuess}
                      placeholderTextColor="#ffffff" // Light placeholder text
                    />
                    <Button title="Submit Guess" onPress={() => checkGuess(Number(guess))} color="#007BFF" />
                  </>
                )}
                <Button title="Exit to Menu" onPress={exitGame} color="red" />
              </>
            )}
            <ThemedText>Correct Guesses: {correctGuesses}</ThemedText>
            <ThemedText>Incorrect Guesses: {incorrectGuesses}</ThemedText>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  roundButton: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#007BFF', // Change to your desired button color
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    color: '#ffffff', // Light text color for input
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  optionButton: {
    width: '48%', // Two buttons per row
    marginBottom: 10,
    backgroundColor: '#007BFF', // Blue background
    borderRadius: 10, // Rounded corners
    padding: 10, // Padding for better touch area
  },
});
