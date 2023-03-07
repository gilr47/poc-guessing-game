import React, { useEffect } from "react";
import { startSession } from "../../../apiClient";
import { GameStatus, GameStartingComponentProps } from "../../../types";

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