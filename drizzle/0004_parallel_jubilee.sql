ALTER TABLE "data" ADD COLUMN "game_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data" ADD CONSTRAINT "data_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
