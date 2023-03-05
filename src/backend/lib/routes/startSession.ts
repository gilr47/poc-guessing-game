import { guardStartSessionInput, StartSessionOutput } from "@pocGuessingGame/common/lib/apiTypes";
import { Request, Response } from "express";
import SqlString from "sqlstring";
import { getDBInstance, getValidDBUUID } from "../db/helpers";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../errors";

export default async function startSession(req: Request, res: Response) {
	const { query } = req;
	if (!guardStartSessionInput(query)) {
		return res.status(400).json(BAD_REQUEST);
	}
	const sessionId = await getValidDBUUID();
	const db = getDBInstance();	 
	db.run(SqlString.format(`INSERT INTO sessions(id, username) VALUES(?, ?)`, [sessionId, query.username]), (err) => {
		if (err) {
			res.status(500).json(INTERNAL_SERVER_ERROR);
		} else {
			const output: StartSessionOutput = {
				sessionId,
			}; 
			res.status(200).json(output);
		}
		db.close();
	});
	
}