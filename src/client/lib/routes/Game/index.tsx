import React, {
	useEffect,
	useRef,
	useState
} from "react";
import { BaseGameProps, GameStatus, Message } from "../../types";
import GamePendingComponent from "./components/GamePendingComponent";
import GameStartingComponent from "./components/GameStartingComponent";
import GameWaitingForKeyComponent from "./components/GameWaitingForKeyComponent";
import GameWaitingComponent from "./components/GameWaitingComponent";
import { reportData } from "../../apiClient";


const gameCss = require("../css/game.css");
const {
	csMain
} = gameCss;

type Props = {
	setMessage: (message: Message) => void;
}

export default function Game({ setMessage }: Props) {
	const lastGameStatus = useRef<GameStatus | undefined>();
	const currentKeyPressed = useRef<string>("");
	const [stateStatus, setStatus] = useState<GameStatus>(GameStatus.Pending);
	const [stateUsername, setUsername] = useState<string>("");
	const [stateGameSessionUuid, setGameSessionUuid] = useState<string>("");
	const [preSelectedKey, setPreSelectedKey] = useState<"a" | "l" | undefined>();
	
	

	const listenerHandler = ({ key }: KeyboardEvent) => {
		if ([GameStatus.Pending, GameStatus.StartingGame].includes(stateStatus)) {  
			return;
		}
		currentKeyPressed.current = key;
		if (GameStatus.Waiting === stateStatus) {
			setMessage({ color: "red", text: "Too Soon !" });
			setStatus(GameStatus.StartingGame);
		}  else {
			console.log(preSelectedKey, key);
			if (preSelectedKey !== key) {
				setMessage({ color: "red", text: "Wrong Key !" });
				setStatus(GameStatus.StartingGame);
			} else {
				setMessage({ color: "green", text: "Success !" });
				reportData({ sessionId: stateGameSessionUuid});
			}
			currentKeyPressed.current = "";
			lastGameStatus.current = undefined;
		}
	}
	
	useEffect(() => {
		window.document.addEventListener("keypress", listenerHandler);
		return () => {
			window.document.removeEventListener("keypress", listenerHandler);
		}
	}, [stateStatus, preSelectedKey]);
	useEffect(() => { 
		if (GameStatus.StartingGame === stateStatus) {
			currentKeyPressed.current = "";
			setPreSelectedKey(undefined);
		}
		if (!currentKeyPressed.current && GameStatus.WaitingForKey === lastGameStatus.current && GameStatus.Waiting === stateStatus) {
			setMessage({ color: "red", text: "Too Late !" });
			setStatus(GameStatus.StartingGame);
		} 
		lastGameStatus.current = stateStatus;
	}, [stateStatus]);
	const baseProps: BaseGameProps = {
		setGameStatus: setStatus,
		username: stateUsername,
		css: gameCss,
	};
	const pendimgModeComponents =  stateStatus === GameStatus.Pending  &&  <GamePendingComponent { ...baseProps } setUsername={setUsername} />;
	const startingModeComponents =  stateStatus === GameStatus.StartingGame  &&  <GameStartingComponent { ...baseProps } setGameSessionUuid={setGameSessionUuid} />;
	const waitingModeComponents =  stateStatus === GameStatus.Waiting  &&  <GameWaitingComponent {...baseProps} />;
	const waitingForKeyModeComponents =  stateStatus === GameStatus.WaitingForKey  &&  <GameWaitingForKeyComponent {...baseProps} preSelectedKey={preSelectedKey} setPreSelectedKey={setPreSelectedKey} />;
	return (
		<div className={csMain}>
			{pendimgModeComponents}
			{startingModeComponents}
			{waitingModeComponents}
			{waitingForKeyModeComponents}
		</div>
	);
}