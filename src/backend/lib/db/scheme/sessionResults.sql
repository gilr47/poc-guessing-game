CREATE TABLE `sessionResults` (
	score INTEGER NOT NULL,
	sessionId VARCHAR(32) NOT NULL UNIQUE,
	CONSTRAINT fk_sessionId
	FOREIGN KEY (sessionId)
		REFERENCES sessions (id)
			ON UPDATE RESTRICT
			
);