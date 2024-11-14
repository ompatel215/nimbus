import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchWeatherData } from '@/services/api';
import { useRouter } from 'expo-router';

// Define a type for the weather data
type WeatherData = {
  temperature?: number;
  temperatureUnit?: string;
  error?: string;
};

const cities = {
  easy: [
    { name: 'Los Angeles', state: 'CA' },
    { name: 'New York', state: 'NY' },
    { name: 'Chicago', state: 'IL' },
    { name: 'Philadelphia', state: 'PA' },
    { name: 'Houston', state: 'TX' },
    { name: 'Dallas', state: 'TX' },
    { name: 'Atlanta', state: 'GA' },
    { name: 'Miami', state: 'FL' },
  ],
  medium: [
    { name: 'San Francisco', state: 'CA' },
    { name: 'Miami', state: 'FL' },
    { name: 'Seattle', state: 'WA' },
    { name: 'Denver', state: 'CO' },
    { name: 'Boston', state: 'MA' },
    { name: 'Phoenix', state: 'AZ' },
    { name: 'Orlando', state: 'FL' },
  ],
  hard: [
    { name: 'Anchorage', state: 'AK' },
    { name: 'Honolulu', state: 'HI' },
    { name: 'Phoenix', state: 'AZ' },
    { name: 'Salt Lake City', state: 'UT' },
    { name: 'Boise', state: 'ID' },
    { name: 'Santa Fe', state: 'NM' },
    { name: 'Little Rock', state: 'AR' },
  ],
};

export default function GameScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [difficulty, setDifficulty] = useState<keyof typeof cities | null>(null);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state
  const [guess, setGuess] = useState(''); // State for user input
  const [temperatureOptions, setTemperatureOptions] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false); // State to manage hint visibility

  const startGame = async (level: keyof typeof cities) => {
    setDifficulty(level);
    await fetchNewCity(level);
  };

  const fetchNewCity = async (level: keyof typeof cities) => {
    const randomCity = cities[level][Math.floor(Math.random() * cities[level].length)];
    setCity(`${randomCity.name}, ${randomCity.state}`); // Set city with state
    setWeatherData(null);
    setLoading(true);
    setShowHint(false); // Reset showHint when fetching a new city

    const data = await fetchWeatherData(randomCity.name); // Fetch weather data using city name
    setLoading(false);
    if (data.error) {
      Alert.alert('Error', data.error);
      return;
    }
    setWeatherData(data);

    // Generate temperature options based on difficulty
    if (level === 'easy' && data.temperature) {
      generateTemperatureOptions(data.temperature);
    } else if (level === 'hard' && data.temperature) {
      generateHardModeTemperatureOptions(data.temperature); // Call the new function for hard mode
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

  const generateHardModeTemperatureOptions = (actualTemp: number) => {
    const options = new Set<number>();
    // Generate close temperature options
    for (let i = -1; i <= 2; i++) {
      options.add(actualTemp + i); // Add actual temperature and close values
    }

    setTemperatureOptions(Array.from(options).sort(() => Math.random() - 0.5)); // Shuffle options
  };

  const checkGuess = async (userGuess: number) => {
    if (!weatherData || !weatherData.temperature) return;

    const actualTemp = weatherData.temperature;

    if (Math.abs(actualTemp - userGuess) <= 3) {
      const newCorrectGuesses = correctGuesses + 1;
      setCorrectGuesses(newCorrectGuesses);

      Alert.alert(
        'Correct!',
        `You guessed within 3 degrees! The actual temperature is ${actualTemp}°${weatherData.temperatureUnit}.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (difficulty === 'medium' && newCorrectGuesses === 5) {
                Alert.alert(
                  'Congratulations!',
                  'You have guessed 5 temperatures correctly in the Game of the Day!',
                  [
                    { text: 'Back to Menu', onPress: exitGame },
                    { text: 'Continue', onPress: () => fetchNewCity(difficulty as Exclude<typeof difficulty, null>) }
                  ]
                );
              } else {
                fetchNewCity(difficulty as Exclude<typeof difficulty, null>);
              }
            }
          }
        ]
      );
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
      Alert.alert('Incorrect', `The actual temperature is ${actualTemp}°${weatherData.temperatureUnit}.`, [
        { text: 'OK', onPress: () => difficulty && fetchNewCity(difficulty) }
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

  const generateHint = () => {
    if (weatherData && weatherData.temperature) {
      const hintRange = 5; // Define the range for the hint
      const lowerBound = weatherData.temperature - hintRange;
      const upperBound = weatherData.temperature + hintRange;
      return `The temperature is between ${lowerBound}° and ${upperBound}°`;
    }
    return '';
  };

  const startGameOfTheDay = async () => {
    const allCities = [...cities.easy, ...cities.medium, ...cities.hard];
    const randomCity = allCities[Math.floor(Math.random() * allCities.length)];
    setCity(`${randomCity.name}, ${randomCity.state}`);
    setWeatherData(null);
    setLoading(true);
    setShowHint(false);

    const data = await fetchWeatherData(randomCity.name);
    setLoading(false);
    if (data.error) {
      Alert.alert('Error', data.error);
      return;
    }
    setWeatherData(data);

    // Generate temperature options for the game of the day
    if (data.temperature) {
      generateTemperatureOptions(data.temperature);
    }

    // Set difficulty to 'medium' for Game of the Day
    setDifficulty('medium');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {difficulty === null ? (
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
            <View style={styles.gameOfTheDayButtonContainer}>
              <View style={styles.wideButton}>
                <Button title="Game of the Day" onPress={startGameOfTheDay} color="#fff" />
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
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Enter your guess in degrees Fahrenheit"
                      keyboardType="numeric"
                      value={guess}
                      onChangeText={setGuess}
                      placeholderTextColor="#888888"
                      selectionColor={colors.text}
                    />
                    <Button title="Submit Guess" onPress={() => checkGuess(Number(guess))} color="#007BFF" />
                  </>
                )}
                {difficulty === 'medium' && (
                  <>
                    <Button title="Show Hint" onPress={() => setShowHint(!showHint)} color="#FFA500" />
                    {showHint && (
                      <ThemedText style={[styles.hintText, { color: colors.text }]}>{generateHint()}</ThemedText>
                    )}
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
  gameOfTheDayButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  roundButton: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#007BFF',
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  wideButton: {
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#28a745',
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
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
  hintText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ffffff',
  },
});
