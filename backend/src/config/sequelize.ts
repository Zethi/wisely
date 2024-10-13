import { Sequelize } from 'sequelize';
import { appConfig } from './appConfig';
import fs from 'fs';
import path from 'path';

export const sequelizeConnection: Sequelize = new Sequelize(appConfig.db.database, appConfig.db.username, appConfig.db.password, {
  host: appConfig.db.host,
  dialect: appConfig.db.dialect,
  logging: console.log,
});

const importModels = async (): Promise<void> => {
  const modelsPath = path.join(__dirname, '../models');
  const files = fs.readdirSync(modelsPath);
  for (const file of files) {
    if (file.endsWith('model.ts')) {
      await import(path.join(modelsPath, file));
    }
  }
};

export const syncModels = async (): Promise<void> => {
  try {
    await importModels();
    await sequelizeConnection.sync({ alter: true });
    console.log("Models synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing models:", error);
    throw error;
  }
};

export const testDBConnection = async (): Promise<void> => {
  try {
    await sequelizeConnection.authenticate();
    console.log('DB is working fine!');
  } catch (error) {
    console.error('DB test connection error:', error);
    throw error;
  }
};