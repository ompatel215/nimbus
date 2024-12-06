import AsyncStorage from '@react-native-async-storage/async-storage';

interface StreakData {
  lastPlayedDate: string;
  currentStreak: number;
}

interface UserData {
  userId: string;
  userName: string;
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

export const setUserName = async (userId: string, name: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(`user_${userId}`, name);
  } catch (error) {
    console.error('Error saving user name:', error);
  }
};

export const getUserName = async (userId: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(`user_${userId}`);
  } catch (error) {
    console.error('Error getting user name:', error);
    return null;
  }
};

export const getUserData = async (): Promise<UserData[]> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const streakKeys = allKeys.filter(key => key.startsWith('streak_'));
    const userData: UserData[] = [];

    for (const key of streakKeys) {
      const userId = key.replace('streak_', '');
      const streakData = await AsyncStorage.getItem(key);
      const userName = await AsyncStorage.getItem('userName') || `User ${userId}`;
      
      if (streakData) {
        const { currentStreak } = JSON.parse(streakData);
        userData.push({
          userId,
          userName,
          currentStreak
        });
      }
    }

    return userData.sort((a, b) => b.currentStreak - a.currentStreak);
  } catch (error) {
    console.error('Error getting user data:', error);
    return [];
  }
}; 