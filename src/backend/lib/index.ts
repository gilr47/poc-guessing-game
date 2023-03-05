import { pathExists } from "fs-extra";
import dbInitializer from "./db/initializer";
import { DB_PATH } from "./consts";

(async () => { 
	if (!(await pathExists(DB_PATH))) {
		console.log("DB File doesn't exist, iniitalizing it");
		await dbInitializer();
	}
})();