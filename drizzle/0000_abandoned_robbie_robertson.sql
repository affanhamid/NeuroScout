CREATE TABLE IF NOT EXISTS "TNT_DATA" (
	"time_of_data" timestamp NOT NULL,
	"vts" integer NOT NULL,
	"scores" real[] NOT NULL,
	"age" integer NOT NULL,
	"highest_level" text NOT NULL,
	"time_to_clicks" real[] NOT NULL,
	"screen_width" integer NOT NULL,
	"screen_height" integer NOT NULL,
	"ball_size" real NOT NULL,
	"duration" real NOT NULL,
	"num_practice_rounds" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_FLASH_DATA" (
	"time_of_data" timestamp NOT NULL,
	"vts" integer NOT NULL,
	"scores" real[] NOT NULL,
	"age" integer NOT NULL,
	"highest_level" text NOT NULL,
	"time_to_clicks" real[] NOT NULL,
	"screen_width" integer NOT NULL,
	"screen_height" integer NOT NULL,
	"ball_size" real NOT NULL,
	"duration" real NOT NULL,
	"num_practice_rounds" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_FLASH_PARAMS" (
	"number_of_balls" integer NOT NULL,
	"target_balls" integer NOT NULL,
	"duration" integer NOT NULL,
	"starting_vts" integer NOT NULL,
	"practice_trials" integer NOT NULL,
	"trials" integer NOT NULL,
	"visible_time" real NOT NULL,
	"invisible_time" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_PARAMS" (
	"number_of_balls" integer NOT NULL,
	"target_balls" integer NOT NULL,
	"duration" integer NOT NULL,
	"starting_vts" integer NOT NULL,
	"practice_trials" integer NOT NULL,
	"trials" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_STROBE_DATA" (
	"time_of_data" timestamp NOT NULL,
	"vts" integer NOT NULL,
	"scores" real[] NOT NULL,
	"age" integer NOT NULL,
	"highest_level" text NOT NULL,
	"time_to_clicks" real[] NOT NULL,
	"screen_width" integer NOT NULL,
	"screen_height" integer NOT NULL,
	"ball_size" real NOT NULL,
	"duration" real NOT NULL,
	"num_practice_rounds" integer NOT NULL,
	"strobe_a" real NOT NULL,
	"strobe_b" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TNT_STROBE_PARAMS" (
	"number_of_balls" integer NOT NULL,
	"target_balls" integer NOT NULL,
	"duration" integer NOT NULL,
	"starting_vts" integer NOT NULL,
	"practice_trials" integer NOT NULL,
	"trials" integer NOT NULL,
	"strobe_a" real NOT NULL,
	"strobe_b" real NOT NULL
);
