import { Request, Response } from "express";
import { getDBInstance } from "../db/helpers";
import { INTERNAL_SERVER_ERROR } from "../errors";

export default function leaderboards(req: Request, res: Response) {
	//RETURN ALL user scores, sorted by highest scores. 
	if (!req) return ;
	const db = getDBInstance();
	db.all("SELECT sessions.username, SUM(sessionResults.score) as score FROM sessionResults INNER JOIN sessions ON sessionResults.sessionId = sessions.id GROUP BY sessions.username ORDER BY score DESC", (err, rows) => { 
		if (err) {
			res.status(500).json(INTERNAL_SERVER_ERROR);
		} else {
			res.status(200).json(rows)
		}
		db.close();
	});
}