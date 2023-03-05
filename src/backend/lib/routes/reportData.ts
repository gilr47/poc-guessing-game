import { guardReportDataInput, ReportDataOutput } from "@pocGuessingGame/common/lib/apiTypes";
import { Request, Response } from "express";
import SqlString from "sqlstring";
import { getDBInstance } from "../db/helpers";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../errors";

const sum = (...arrOfNumbers: (0 | 1)[]) => {
	let returnVal = 0;
	for (const n of arrOfNumbers) {
		returnVal += n;
	}
	return returnVal;
}
export default function reportData(req: Request, res: Response) {
	const { body } = req;
	if (!guardReportDataInput(body)) {
		return res.status(400).json(BAD_REQUEST);
	}
	const { sessionId, results } = body;
	const db = getDBInstance();
	db.run(SqlString.format("INSERT INTO sessionResults VALUES(sessionId, score) VALUES(?, ?)", [sessionId, sum(...results)]), (err) => { 
		if (err) {
			res.status(500).json(INTERNAL_SERVER_ERROR)
		} else {
			res.status(200).json({});
		}
		db.close();
	});
	
}