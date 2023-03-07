import React, { useEffect } from "react";
import { GameStatus, GamePendingComponentProps } from "../../../types";

/**
 * A component handling the first state of the game, presenting a UI button for starting the game and prompting a username
 */
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