import sqlite3 from "sqlite3";
import SqlString from "sqlstring";
import { v4 as uuid } from "uuid";
import { DB_PATH } from "../consts";

/**
 * 
 * @returns a Database class instance sqlite3
 */
export function getDBInstance()  { 
	const database = new sqlite3.Database(DB_PATH);
	database.run("PRAGMA foreign_keys = ON;"); //To support foreign keys in schema validation in every query being made
	return database;
}

/**
 * this function gets a uuis, and checks wether this session uuid was already used or not. it queries the database for that
 * @param {string} uuid
 * @returns {Promise<boolean>} a promise. true for valid (doesn't exist in db) and false for invalid uuid
 */
export default function isSessionGuidValid(guid: string): Promise<boolean> { 
	return new Promise((resolve, reject) => { 
		const db = getDBInstance();
		db.serialize(() => { 
			db.get(SqlString.format(`SELECT rowId FROM uuids WHERE id = ?`, [guid]), (err, row) => { 
				if (err) { 
					reject(err);
				} else if (!row) {
					resolve(true);
				} else {
					resolve(false);
				}
				db.close();
			});
		});
	});
}

/**
 * queris the database and gets a new uuid that was not used by the db yet.
 * @returns {Promise<string>}
 */
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