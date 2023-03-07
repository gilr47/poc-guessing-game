import bodyParser from "body-parser";
import express from "express";	
import cors from "cors";
import leaderboards from "./routes/leaderBoards";
import reportData from "./routes/reportData";
import startSession from "./routes/startSession";
import { APIRoutes } from "@pocGuessingGame/common";

const APP_PORT = 3000;

export default function App() {
	const jsonParserMiddleware = bodyParser.json({});
	const app = express();
	app.use(cors({
		origin: "*",
	}));
	app.get(APIRoutes.StartSession, startSession);
	app.post(APIRoutes.ReportData, jsonParserMiddleware, reportData);
	app.get(APIRoutes.Leaderboards, leaderboards);
	app.listen(APP_PORT, () => { 
		console.log("Starting Service");
	})
}