import AsyncStorage from '@react-native-async-storage/async-storage';

interface StreakData {
  lastPlayedDate: string;
  currentStreak: number;
}

export const setupDatabase = (): void => {
  // Database setup logic
};

export const getStreak = async (userId: string, callback: (data: StreakData | null) => void): Promise<void> => {
  try {
    const storedStreak = await AsyncStorage.getItem(`streak_${userId}`);
    callback(storedStreak ? JSON.parse(storedStreak) : { lastPlayedDate: '', currentStreak: 0 });
  } catch (error) {
    console.error('Error getting streak:', error);
    callback(null);
  }
};

export const updateStreak = async (userId: string): Promise<void> => {
  const today = new Date().toISOString().split('T')[0];
  
  getStreak(userId, async (currentStreak) => {
    let newStreak = currentStreak || { lastPlayedDate: '', currentStreak: 0 };
    
    if (newStreak.lastPlayedDate === today) {
      // Already updated today
      return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (newStreak.lastPlayedDate === yesterdayStr) {
      // Consecutive day
      newStreak.currentStreak += 1;
    } else if (newStreak.lastPlayedDate !== today) {
      // Streak broken
      newStreak.currentStreak = 1;
    }
    
    newStreak.lastPlayedDate = today;
    try {
      await AsyncStorage.setItem(`streak_${userId}`, JSON.stringify(newStreak));
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  });
};

export const resetStreak = async (userId: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(`streak_${userId}`, JSON.stringify({ lastPlayedDate: '', currentStreak: 0 }));
  } catch (error) {
    console.error('Error resetting streak:', error);
  }
}; 