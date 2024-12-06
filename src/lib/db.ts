import { openDB } from 'idb';

const DB_NAME = 'gameAuthDB';
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'username' });
      }
      if (!db.objectStoreNames.contains('scores')) {
        db.createObjectStore('scores', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

export const addUser = async (username: string, password: string) => {
  const db = await initDB();
  await db.put('users', { username, password });
};

export const getUser = async (username: string) => {
  const db = await initDB();
  return db.get('users', username);
};

export const addScore = async (username: string, score: number) => {
  const db = await initDB();
  await db.add('scores', { username, score, date: new Date().toISOString() });
};

export const getTopScores = async () => {
  const db = await initDB();
  return db.getAllFromIndex('scores', 'score', null, 10);
};