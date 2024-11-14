CREATE TABLE IF NOT EXISTS "TNT_FLASH_INSTRUCTIONS" (
	"id" serial PRIMARY KEY NOT NULL,
	"step" integer NOT NULL,
	"link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_INSTRUCTIONS" (
	"id" serial PRIMARY KEY NOT NULL,
	"step" integer NOT NULL,
	"link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_STROBE_INSTRUCTIONS" (
	"id" serial PRIMARY KEY NOT NULL,
	"step" integer NOT NULL,
	"link" text NOT NULL
);
