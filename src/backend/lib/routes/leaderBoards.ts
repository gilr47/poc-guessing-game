import { guardStartSessionInput } from "@pocGuessingGame/common/lib/apiTypes";
import { Request, Response } from "express";
import { BAD_REQUEST } from "../errors";

export default function leaderboards(req: Request, res: Response) {
	//RETURN ALL user scores, sorted by highest scores. 
}