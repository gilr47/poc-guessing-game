import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import { HashRouter, Routes } from "react-router-dom";
import {
	Game,
	LeaderBoards
} from "./routes";
import { Message } from "./types";

const {
	mainCs,
	bottom,
} = require("./css/main.css");

const routes = ["game", "leaderboards"] as const;

const getRoutesComponents = () => { 
	return routes.map((r) => <Link to={r}><span>{r}</span></Link>);
}


const MainFrame = () => { 
	const [stateMessage, setStateMessage] = useState<Message>();
	const routesElements = getRoutesComponents();
	return (
		<div className={mainCs}>
			<h1>
				Guessing Game
			</h1>
			<header>
				{
					routesElements
				}
			</header>
			<div id="container">
				<Routes>
						<Route index path="game" element={ <Game setMessage={setStateMessage} />} />
						<Route path="leaderboards" element={ <LeaderBoards /> } />
				</Routes>
			</div>
			<div className={bottom}>
				<div>
					{stateMessage && <h6 style={{ backgroundColor: stateMessage.color}}>{ stateMessage.text }</h6>}
				</div>
			</div>
		</div>
	)
};
const App = () => {
	return (
		<HashRouter>
			<MainFrame />
		</HashRouter>
	);
}

export default App;