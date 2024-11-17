ALTER TABLE "tnt_instruction" RENAME TO "instruction";--> statement-breakpoint
ALTER TABLE "instruction" DROP CONSTRAINT "tnt_instruction_game_id_game_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instruction" ADD CONSTRAINT "instruction_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
