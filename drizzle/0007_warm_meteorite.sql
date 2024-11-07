ALTER TABLE "TNT_FLASH_PARAMS" ADD COLUMN "randomness_mean" real NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_PARAMS" ADD COLUMN "randomness_std" real NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" DROP COLUMN IF EXISTS "randomness_mean";--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" DROP COLUMN IF EXISTS "randomness_std";