import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const LEADERBOARD_DATA = [
  { id: '1', username: 'User1', streak: 10 },
  { id: '2', username: 'User2', streak: 8 },
  { id: '3', username: 'User3', streak: 7 },
  { id: '4', username: 'User4', streak: 5 },
  { id: '5', username: 'User5', streak: 4 },
];

const LeaderboardScreen = () => {
  const renderItem = ({ item }: { item: { username: string; streak: number } }) => (
    <View style={styles.itemContainer}>
      <ThemedText style={styles.username}>{item.username}</ThemedText>
      <ThemedText style={styles.streak}>{item.streak} days</ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Leaderboard</ThemedText>
      <FlatList
        data={LEADERBOARD_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 55,
    marginBottom: 60,
    textAlign: 'center',
    lineHeight: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontSize: 18,
  },
  streak: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
