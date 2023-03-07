import {APITypes,  APIRoutes } from "@pocGuessingGame/common";
import axios from "axios";
import { API_BASE_URL } from "./consts";

export const startSession = ({ username }: APITypes.StartSessionInput): Promise<APITypes.StartSessionOutput> => { 
	return axios.request<APITypes.StartSessionOutput>({
		baseURL: API_BASE_URL,
		url: APIRoutes.StartSession,
		method: "GET",
		params: { username },
	}).then((res) => {
		return res.data;
	}).catch((err) => {
		return Promise.reject(err);
	});
}

export const reportData = ({ sessionId }: APITypes.ReportDataInput): Promise<APITypes.ReportDataOutput> => { 
	return axios.request<APITypes.StartSessionOutput>({
		baseURL: API_BASE_URL,
		url: APIRoutes.ReportData,
		method: "POST",
		data: { sessionId },
	})
	.then(() => { 
			
	})
	.catch((err) => {
		return Promise.reject(err);
	});
}

export const leaderboards = (): Promise<APITypes.LeaderboardsOutput> => {
	return axios.request<APITypes.LeaderboardsOutput>({
		baseURL: API_BASE_URL,
		url: APIRoutes.Leaderboards,
		method: "GET",
	}).then((res) => { 
		return res.data;
	})
	.catch((err) => {
		return Promise.reject(err);
	});
}