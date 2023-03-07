import React, { useEffect } from "react";
import { MAX_WAITING_TIME_MS, MIN_WAITING_TIME_MS } from "../../../consts";
import { BaseGameProps, GameStatus } from "../../../types";
import { getRandomInt } from "../../../utils";

/**
 * A component showing the UI of the random "dead" time between the indicator component will show
 */
export default function  ({ setGameStatus, css }: BaseGameProps) {
	useEffect(() => { 
		const timeoutMS = getRandomInt(MIN_WAITING_TIME_MS, MAX_WAITING_TIME_MS);
		const timeoutHandler = setTimeout(() => { 
			setGameStatus(GameStatus.WaitingForKey);
		}, timeoutMS);
		return () => clearTimeout(timeoutHandler);
	}, []);
	return (
		<div className={css.gameWaiting}>
			<h1>
				Get Ready, The Indicator will show soon enough !
			</h1>
		</div>
	);
};