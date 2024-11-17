CREATE TABLE IF NOT EXISTS "data" (
	"id" serial PRIMARY KEY NOT NULL,
	"param_id" integer,
	"time_of_data" timestamp NOT NULL,
	"screen_width" integer NOT NULL,
	"screen_height" integer NOT NULL,
	"ball_size" real NOT NULL,
	"result_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"link" text NOT NULL,
	"image_link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "param" (
	"id" serial PRIMARY KEY NOT NULL,
	"practice_trials" integer NOT NULL,
	"trials" integer NOT NULL,
	"in_use" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "result" (
	"id" serial PRIMARY KEY NOT NULL,
	"result" jsonb NOT NULL,
	"form_data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnt_glow_param" (
	"param_id" integer,
	"number_of_balls" integer NOT NULL,
	"target_balls" integer NOT NULL,
	"duration" integer NOT NULL,
	"starting_vts" integer NOT NULL,
	"change_in_vts" integer NOT NULL,
	"randomness_mean" real NOT NULL,
	"randomness_std" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnt_instruction" (
	"id" serial PRIMARY KEY NOT NULL,
	"step" integer NOT NULL,
	"link" text NOT NULL,
	"game_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnt_param" (
	"param_id" integer,
	"number_of_balls" integer NOT NULL,
	"target_balls" integer NOT NULL,
	"duration" integer NOT NULL,
	"starting_vts" integer NOT NULL,
	"change_in_vts" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tnt_strobe_param" (
	"param_id" integer,
	"number_of_balls" integer NOT NULL,
	"target_balls" integer NOT NULL,
	"duration" integer NOT NULL,
	"starting_vts" integer NOT NULL,
	"change_int_vts" integer NOT NULL,
	"strobe_a" real NOT NULL,
	"strobe_b" real NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data" ADD CONSTRAINT "data_param_id_param_id_fk" FOREIGN KEY ("param_id") REFERENCES "public"."param"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data" ADD CONSTRAINT "data_result_id_result_id_fk" FOREIGN KEY ("result_id") REFERENCES "public"."result"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnt_glow_param" ADD CONSTRAINT "tnt_glow_param_param_id_param_id_fk" FOREIGN KEY ("param_id") REFERENCES "public"."param"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnt_instruction" ADD CONSTRAINT "tnt_instruction_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnt_param" ADD CONSTRAINT "tnt_param_param_id_param_id_fk" FOREIGN KEY ("param_id") REFERENCES "public"."param"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tnt_strobe_param" ADD CONSTRAINT "tnt_strobe_param_param_id_param_id_fk" FOREIGN KEY ("param_id") REFERENCES "public"."param"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
