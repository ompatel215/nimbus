import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchWeatherData } from '@/app/api';

const cities = {
  easy: ['Los Angeles', 'New York', 'Chicago'],
  medium: ['San Francisco', 'Miami', 'Seattle'],
  hard: ['Anchorage', 'Honolulu', 'Phoenix'],
};

export default function GameScreen() {
  const navigation = useNavigation();
  const [difficulty, setDifficulty] = useState(null);
  const [city, setCity] = useState('');
  const [guess, setGuess] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const startGame = (level) => {
    setDifficulty(level);
    const randomCity = cities[level][Math.floor(Math.random() * cities[level].length)];
    setCity(randomCity);
    setWeatherData(null);
  };

  const checkGuess = async () => {
    if (!city) return;

    const data = await fetchWeatherData(city);
    if (data.error) {
      Alert.alert('Error', data.error);
      return;
    }

    setWeatherData(data);
    const actualTemp = data.temperature;
    const userGuess = parseFloat(guess);

    const resetGame = () => {
      setDifficulty(null);
      setCity('');
      setGuess('');
      setWeatherData(null);
    };

    if (Math.abs(actualTemp - userGuess) <= 3) {
      setCorrectGuesses(correctGuesses + 1);
      Alert.alert('Correct!', `You guessed within 3 degrees! The actual temperature is ${actualTemp}°${data.temperatureUnit}.`, [
        { text: 'OK', onPress: resetGame }
      ]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
      Alert.alert('Incorrect', `The actual temperature is ${actualTemp}°${data.temperatureUnit}.`, [
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
            <TextInput
              style={styles.input}
              placeholder="Enter your guess"
              keyboardType="numeric"
              value={guess}
              onChangeText={setGuess}
            />
            <Button title="Submit Guess" onPress={checkGuess} />
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
    color: '#FFFFFF', // Change text color to white
  },
});
