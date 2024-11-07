ALTER TABLE "TNT_DATA" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" ADD COLUMN "randomness_mean" real NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" ADD COLUMN "randomness_std" real NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_STROBE_DATA" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;