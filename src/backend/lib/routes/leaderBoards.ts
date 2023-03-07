import { LeaderboardsOutput, ReportDataOutput } from "@pocGuessingGame/common/lib/apiTypes";
import { Request, Response } from "express";
import { getDBInstance } from "../db/helpers";
import { INTERNAL_SERVER_ERROR } from "../errors";

/**
 * the leaderboards route will return the maximal steps a user has reached, accross multiple sessions
 */
export default function leaderboards(req: Request, res: Response) {
	//RETURN ALL user scores, sorted by highest scores. 
	if (!req) return ;
	const db = getDBInstance();
	db.all("SELECT sessions.username, MAX(sessionResults.steps) as score FROM sessionResults INNER JOIN sessions ON sessionResults.sessionId = sessions.id WHERE sessionResults.steps > 0 GROUP BY sessions.username ORDER BY score DESC", (err, rows) => { 
		if (err) {
			console.log(err);
			res.status(500).json(INTERNAL_SERVER_ERROR);
		} else {
			const results: LeaderboardsOutput = rows.map(({ username, score }) => [username as string, score as number]);
			res.status(200).json(results);
		}
		db.close();
	});
}