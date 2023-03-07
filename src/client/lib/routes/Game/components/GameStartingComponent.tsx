import React, { useEffect } from "react";
import { startSession } from "../../../apiClient";
import { GameStatus, GameStartingComponentProps } from "../../../types";

/**
 * A component handling the side effect of starting a new game (calling the server api for starting a session)
 */
export default function GameStartingComponent ({ setGameStatus, setGameSessionUuid, username }: GameStartingComponentProps) { 
	useEffect(() => {
		if (username) {
			startSession({ username }).then(({ sessionId }) => { 
				setGameSessionUuid(sessionId);
				setGameStatus(GameStatus.Waiting);
			});
		}
	}, []);
	return (
		<></>
	)
};