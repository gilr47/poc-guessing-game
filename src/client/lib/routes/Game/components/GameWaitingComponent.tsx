import React, { useEffect } from "react";
import { BaseGameProps, GameStatus } from "../../../types";
import { getRandomInt } from "../../../utils";

export default function  ({ setGameStatus, css }: BaseGameProps) {
	useEffect(() => { 
		const timeoutMS = getRandomInt(2000, 5000);
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