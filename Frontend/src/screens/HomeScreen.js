import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import TemperatureInput from '../components/TemperatureInput';
import { fetchWeatherData } from '../utils/api';

const HomeScreen = () => {
  const [location, setLocation] = useState('');
  const [guess, setGuess] = useState('');
  
  const handleSubmit = async () => {
    const weather = await fetchWeatherData(location);
    // Compare guess with weather.temperature (from NOAA API)
    if (parseInt(guess) === weather.temperature) {
      alert('Correct guess!');
    } else {
      alert(`Incorrect! The actual temperature is ${weather.temperature}°F.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Temperature!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />
      <TemperatureInput guess={guess} setGuess={setGuess} />
      <Button title="Submit Guess" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});

export default HomeScreen;
