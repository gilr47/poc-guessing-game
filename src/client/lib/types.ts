export enum GameStatus {
	Pending,
	StartingGame,
	Waiting,
	WaitingForKey,
}


export type Message = {
	text: string;
	color: "red" | "green";
} | undefined;

export type BaseGameProps = {
	setGameStatus: (status: GameStatus) => void;
	username?: string;
	css: Record<string, string>;
}

export type GamePendingComponentProps = BaseGameProps & {
	setUsername: (username: string) => void;
}
export type GameStartingComponentProps = BaseGameProps & {
	setGameSessionUuid: (uuid: string) => void;
}

export type GameWaitingForKeyComponentProps = BaseGameProps & {
	preSelectedKey?: "a" | "l";
	setPreSelectedKey: (key?: "a" | "l") => void;
}