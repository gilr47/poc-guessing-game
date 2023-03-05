import { join } from "path";
import { readFile } from "fs-extra";
import sqlite3 from "sqlite3";
import { DB_PATH } from "../consts";


export default function dbInitialize() {
	return new Promise((prResolve, prReject) =>  {
		const db = new sqlite3.Database(DB_PATH);
		readFile(join(__dirname, "schema.sql"), { encoding: "utf8" }).then((schema) => {
			db.run(schema, (dbRes, dbErr) => { 
				if (dbErr) {
					prReject(dbErr);
				} else {
					prResolve(dbRes);
				}
			});
			db.close();
		})
	});
}