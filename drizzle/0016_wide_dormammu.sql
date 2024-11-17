CREATE TABLE IF NOT EXISTS "DATA" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer,
	"params_id" integer,
	"time_of_data" timestamp NOT NULL,
	"screen_width" integer NOT NULL,
	"screen_height" integer NOT NULL,
	"result_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GAME" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"link" text NOT NULL,
	"image_link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_INSTRUCTION" (
	"id" serial PRIMARY KEY NOT NULL,
	"step" integer NOT NULL,
	"link" text NOT NULL,
	"game_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PARAM" (
	"param_id" integer,
	"number_of_balls" integer NOT NULL,
	"target_balls" integer NOT NULL,
	"duration" integer NOT NULL,
	"starting_vts" integer NOT NULL,
	"change_in_vts" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RESULT" (
	"id" serial PRIMARY KEY NOT NULL,
	"result" jsonb NOT NULL,
	"form_response" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_GLOW_PARAM" (
	"number_of_balls" integer NOT NULL,
	"target_balls" integer NOT NULL,
	"duration" integer NOT NULL,
	"starting_vts" integer NOT NULL,
	"change_in_vts" integer NOT NULL,
	"param_id" integer,
	"randomness_mean" real NOT NULL,
	"randomness_std" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_STROBE_PARAM" (
	"param_id" integer,
	"number_of_balls" integer NOT NULL,
	"target_balls" integer NOT NULL,
	"duration" integer NOT NULL,
	"starting_vts" integer NOT NULL,
	"change_in_vts" integer NOT NULL,
	"strobe_a" real NOT NULL,
	"strobe_b" real NOT NULL
);
--> statement-breakpoint
DROP TABLE "GAMES" CASCADE;--> statement-breakpoint
DROP TABLE "TNT_DATA" CASCADE;--> statement-breakpoint
DROP TABLE "TNT_GLOW_DATA" CASCADE;--> statement-breakpoint
DROP TABLE "TNT_GLOW_INSTRUCTIONS" CASCADE;--> statement-breakpoint
DROP TABLE "TNT_GLOW_PARAMS" CASCADE;--> statement-breakpoint
DROP TABLE "TNT_INSTRUCTIONS" CASCADE;--> statement-breakpoint
DROP TABLE "TNT_PARAMS" CASCADE;--> statement-breakpoint
DROP TABLE "TNT_STROBE_DATA" CASCADE;--> statement-breakpoint
DROP TABLE "TNT_STROBE_INSTRUCTIONS" CASCADE;--> statement-breakpoint
DROP TABLE "TNT_STROBE_PARAMS" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DATA" ADD CONSTRAINT "DATA_game_id_GAME_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."GAME"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DATA" ADD CONSTRAINT "DATA_params_id_PARAM_id_fk" FOREIGN KEY ("params_id") REFERENCES "public"."PARAM"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DATA" ADD CONSTRAINT "DATA_result_id_RESULT_id_fk" FOREIGN KEY ("result_id") REFERENCES "public"."RESULT"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TNT_INSTRUCTION" ADD CONSTRAINT "TNT_INSTRUCTION_game_id_GAME_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."GAME"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PARAM" ADD CONSTRAINT "PARAM_param_id_PARAM_id_fk" FOREIGN KEY ("param_id") REFERENCES "public"."PARAM"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TNT_GLOW_PARAM" ADD CONSTRAINT "TNT_GLOW_PARAM_param_id_PARAM_id_fk" FOREIGN KEY ("param_id") REFERENCES "public"."PARAM"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TNT_STROBE_PARAM" ADD CONSTRAINT "TNT_STROBE_PARAM_param_id_PARAM_id_fk" FOREIGN KEY ("param_id") REFERENCES "public"."PARAM"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
