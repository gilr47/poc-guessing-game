import { guardReportDataInput } from "@pocGuessingGame/common";
import { Request, Response } from "express";
import SqlString from "sqlstring";
import { getDBInstance } from "../db/helpers";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../errors";

export default function reportData(req: Request, res: Response) {
	const { body } = req;
	if (!guardReportDataInput(body)) {
		return res.status(400).json(BAD_REQUEST);
	}
	const { sessionId } = body;
	const db = getDBInstance();
	db.get(SqlString.format("SELECT rowId FROM sessionResults WHERE sessionId = ?", [sessionId]), (err, row) => { 
		if (err) {
			console.log(err);
			res.status(500).json(INTERNAL_SERVER_ERROR)
		} else {
			if (!row) {
				db.run(SqlString.format("INSERT INTO sessionResults(sessionId, steps) VALUES(?, ?)", [sessionId, 1]), (err) => { 
					if (err) {
						res.status(500).json(INTERNAL_SERVER_ERROR)
					} else {
						res.status(200).json({});
					}
					db.close();
				});
			} else {
				db.run(SqlString.format("UPDATE sessionResults SET steps = steps + 1 WHERE sessionId = ?", [sessionId]), (err) => { 
					if (err) {
						res.status(500).json(INTERNAL_SERVER_ERROR)
					} else {
						res.status(200).json({});
					}
					db.close();
				});
			}
		}
	});
}