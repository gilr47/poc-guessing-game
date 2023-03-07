import React, { useEffect } from "react";
import { startSession } from "../../../apiClient";
import { GameStatus, GameStartingComponentProps, GamePendingComponentProps } from "../../../types";

export default function GamePendingComponent ({ setGameStatus, setUsername, username }: GamePendingComponentProps) { 
	useEffect(() => { 
		if (username) {
			setGameStatus(GameStatus.StartingGame);
		}
	}, [username])
	return (
		<button onClick={() => {
			let username: string | null | undefined;
			while (!username) {
				username = prompt("What is your username?");
			}
			setUsername(username);
		}}>
			Start Game
		</button>
	)
};