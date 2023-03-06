import { join } from "path";
import { readdir, readFile } from "fs-extra";
import sqlite3 from "sqlite3";
import { DB_PATH } from "../consts";



export default function dbInitialize() {
	return new Promise<unknown[]>((prResolve, prReject) =>  {
		const dbResArr: any[] = [];
		const dbRejectArr: any[] = [];
		const db = new sqlite3.Database(DB_PATH);
		const schemePath = join(__dirname, "scheme");
		db.serialize(() => { 
			readdir(schemePath).then((entries) => { 
				Promise.all(
					entries
						.filter((file) => file.endsWith(".sql"))
						.map((file) => {
							return new Promise((innerResolve, innerReject) => { 
								readFile(join(schemePath, file), { encoding: "utf8" })
									.then((tblCreationSql) => {
										innerResolve(tblCreationSql);
										db.run(tblCreationSql, (dbRes, dbErr) => { 
											if (dbErr) {
												dbRejectArr.push(dbErr);
												innerReject(dbErr);
											} else {
												dbResArr.push(dbRes);
												innerResolve(dbRes);
											}
										});
								});
							});
					})).then(() => { 
						db.close();
						if (0 < dbRejectArr.length) {
							prReject(dbRejectArr);
						} else {
							prResolve(dbResArr);
						}
					});
			});
		});
	});
}