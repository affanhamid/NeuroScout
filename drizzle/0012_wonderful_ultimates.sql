CREATE TABLE IF NOT EXISTS "GAMES" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"link" text NOT NULL
);
