import express, { Express } from "express";
require('dotenv').config();
const cors = require('cors')
import { syncModels, testDBConnection } from "./config/sequelize";
import { appConfig } from "./config/appConfig";
import { allRoutes } from "./routes/router";
import { errorHandler } from "./middlewares/error.middleware";



const app: Express = express();
console.log(appConfig)
app.use(cors());
app.use(express.json());
app.use('/api/v1/', allRoutes)
app.use(errorHandler)

app.listen(appConfig.port, async () => {
    await testDBConnection();
    await syncModels();
    console.log(`Server is running at http://localhost:${appConfig.port}`);
});