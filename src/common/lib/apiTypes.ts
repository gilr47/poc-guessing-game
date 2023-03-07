export type StartSessionInput = {
	username: string;
}

export function guardStartSessionInput(data: any): data is StartSessionInput {
	if (!data) return false;
	if (!data.username || "string" !== typeof data.username) return false;
	return true;
}

export type StartSessionOutput = {
	sessionId: string;
}

export type ReportDataInput = {
	sessionId: string;
}

export function guardReportDataInput(data: any): data is ReportDataInput {
	if (!data) return false;
	if (!data.sessionId || "string" !== typeof data.sessionId) return false;
	return true;
}

export type ReportDataOutput = void;


export type LeaderboardsInput = void;

//A tuple of username and his/her score
export type LeaderboardsOutput = [string, number][]

export enum APIRoutes {
	StartSession = "/startSession",
	ReportData = "/reportData",
	Leaderboards = "/leaderboards",
}
