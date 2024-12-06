import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('streaks.db');

export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS streaks (id INTEGER PRIMARY KEY AUTOINCREMENT, userId TEXT, lastPlayedDate TEXT, currentStreak INTEGER);'
    );
  });
};

export const insertStreak = (userId, lastPlayedDate, currentStreak) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO streaks (userId, lastPlayedDate, currentStreak) values (?, ?, ?);',
      [userId, lastPlayedDate, currentStreak]
    );
  });
};

export const getStreak = (userId, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM streaks WHERE userId = ? ORDER BY id DESC LIMIT 1;',
      [userId],
      (_, { rows: { _array } }) => {
        callback(_array[0]);
      }
    );
  });
};
