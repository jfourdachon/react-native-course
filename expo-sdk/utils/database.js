import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("mapProject");

export const initDatabase = async () => {
  db.execAsync(`
        CREATE TABLE IF NOT EXISTS markers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        imageSource TEXT NOT NULL
        );
    `);
};

export const getAllMarkers = async () => {
  const results = await db.getAllAsync("SELECT * FROM markers");
  return results;
};

export const insertMarker = async ({ coordinate, imageSource }) => {
  const result = await db.runAsync(
    `INSERT INTO markers (latitude, longitude, imageSource) VALUES (${coordinate.latitude}, ${coordinate.longitude}, "${imageSource}")`
  );
  return result.lastInsertRowId;
};

export const updateMarkerCoordinate = ({ id, coordinate }) => {
  db.runAsync(
    `UPDATE markers SET latitude = ${coordinate.latitude}, longitude = ${coordinate.longitude} WHERE id = ${id}`
  );
};

export const removeMarker = ({ id }) => {
  db.runAsync(`DELETE FROM markers WHERE id = ${id}`);
};
