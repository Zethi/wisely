import { Dialect } from "sequelize";

interface DatabaseConfig {
    host: string;
    port: string | number;
    username: string;
    password: string;
    database: string;
    dialect: Dialect;
}

export interface AppConfigInterface {
    port: number | string;
    db: DatabaseConfig;
}