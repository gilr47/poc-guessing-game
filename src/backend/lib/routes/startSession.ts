import { guardStartSessionInput } from "@pocGuessingGame/common/lib/apiTypes";
import { Request, Response } from "express";
import { BAD_REQUEST } from "../errors";

export default function startSession(req: Request, res: Response) {
	const { query } = req;
	if (!guardStartSessionInput(query)) {
		return res.status(400).json(BAD_REQUEST);
	}
	//TODO: open a new DB session
}