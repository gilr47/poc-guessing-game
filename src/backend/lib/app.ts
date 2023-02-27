import { APITypes,  } from "@pocGuessingGame/common";
import express from "express";	
import leaderboards from "./routes/leaderBoards";
import reportData from "./routes/reportData";
import startSession from "./routes/startSession";

const APP_PORT = 3000;

export default function App() {
	const app = express();
	app.get("/StartSession", startSession);
	app.post("/ReportData", reportData);
	app.get("/Leaderboards", leaderboards);
	app.listen(APP_PORT, () => { 
		console.log("Starting Service");
	})
}