export type StartSessionInput = {
	username: string;
}

export type StartSessionOutput = {
	sessionId: string;
	iterations: number;
}

export type ReportDataInput = {
	sessionId: string;
	results: (1 | 0)[];
}

export type ReportDataOutput = void;


export type LeaderboardsInput = void;

//A tuple of username and his/her score
export type LeaderboardsOutput = [string, number][]
