import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WeatherDisplay from './WeatherDisplay';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WeatherDisplay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});