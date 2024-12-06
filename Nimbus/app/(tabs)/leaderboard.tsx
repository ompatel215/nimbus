import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getUserData } from '@/services/database';

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setLeaderboardData(data);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <ThemedText style={styles.username}>{item.userName}</ThemedText>
      <ThemedText style={styles.streak}>{item.currentStreak} days</ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Leaderboard</ThemedText>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId}
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
