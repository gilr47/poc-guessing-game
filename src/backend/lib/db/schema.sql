CREATE TABLE `uuids` (
	id VARCHAR(32) PRIMARY KEY
);

CREATE TABLE `sessions` (
	id VARCHAR(32) NOT NULL PRIMARY KEY UNIQUE,
	username TEXT NOT NULL,
);

CREATE TABLE `sessionResults` (
	score INTEGER NOT NULL,
	sessionId VARCHAR(32) NOT NULL,
	FOREIGN KEY (sessionId)
		REFERENCES sessions (id)
);

