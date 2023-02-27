import { guardReportDataInput } from "@pocGuessingGame/common/lib/apiTypes";
import { Request, Response } from "express";
import { BAD_REQUEST } from "../errors";

export default function reportData(req: Request, res: Response) {
	const { body } = req;
	if (!guardReportDataInput(body)) {
		return res.status(400).json(BAD_REQUEST);
	}
	//TODO: put data in DB
}