import React, { useEffect, useRef, useState } from "react";
import { GAME_DURATION_MS } from "../../../consts";
import { GameStatus, GameWaitingForKeyComponentProps } from "../../../types";
import { getRandomInt } from "../../../utils";
/**
 * A Component for showing the indicator, setting the logic of which side the on screen indicator will show
 */
export default function GameWaitingForKeyComponent({ setGameStatus, css, preSelectedKey, setPreSelectedKey }: GameWaitingForKeyComponentProps) {
	useEffect(() => { 
		if (!preSelectedKey) {
			const randomInt = getRandomInt(1, 100);
			if (randomInt > 50 ) {
				setPreSelectedKey("l");
			} else {
				setPreSelectedKey("a");
			}
			console.log(randomInt);
		} else {
			const timeoutHandler = setTimeout(() => { 
				setGameStatus(GameStatus.Waiting);
			}, GAME_DURATION_MS);
			return () => clearTimeout(timeoutHandler);
		}
	}, [preSelectedKey]);
	if (!preSelectedKey) return <></>;
	return (
		<div className={css.gameWaitingForKey}>
			<span className={[css.indicator, "a" === preSelectedKey  ? css.left : css.right].join(" ")}></span>
			<h1>Hit The Keyboard !</h1>
		</div>
	);
};