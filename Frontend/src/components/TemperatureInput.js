import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TemperatureInput = ({ guess, setGuess }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter your temperature guess"
        value={guess}
        onChangeText={setGuess}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default TemperatureInput;
