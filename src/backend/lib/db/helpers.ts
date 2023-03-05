import sqlite3 from "sqlite3";
import SqlString from "sqlstring";
import { v4 as uuid } from "uuid";
import { DB_PATH } from "../consts";

export function getDBInstance()  { 
	const database = new sqlite3.Database(DB_PATH);
	return database;
}


export default function isSessionGuidValid(guid: string): Promise<boolean> { 
	return new Promise((resolve, reject) => { 
		const db = getDBInstance();
		db.get(SqlString.format(`SELECT rowId FROM uuids WHERE id = ?`, [guid]), (err, row) => { 
			if (err) { 
				reject(err);
			} else if (!row) {
				resolve(false);
			} else {
				resolve(true);
			}
			db.close();
		});
	});
}

export async function getValidDBUUID(): Promise<string> {
	let currentUuid = uuid();
	while (!(await isSessionGuidValid(currentUuid))) {
		currentUuid = uuid();
	}
	return new Promise((prResolve, prReject) => {
		const db = getDBInstance();
		db.run(SqlString.format("INSERT INTO uuids VALUES(?)", [currentUuid]), (err) => { 
			if (err) {
				prReject(err);
			} else {
				prResolve(currentUuid);
			}
			db.close();
		});
	});	
}