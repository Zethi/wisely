import { Dialect } from "sequelize";
import { AppConfigInterface } from "../types/interfaces/appConfig.interface";

export const appConfig: AppConfigInterface = {
    port: process.env.PORT ?? 3000,
    db: {
        host: process.env.DB_HOST!,
        port: process.env.DB_PORT!,
        username: process.env.DB_USERNAME!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!,
        dialect: process.env.DB_DIALECT! as Dialect,
    }
}
