ALTER TABLE "TNT_DATA" ADD COLUMN "params" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" ADD COLUMN "params" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" ADD COLUMN "randomness_mean" real NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" ADD COLUMN "randomnessStd" real NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_STROBE_DATA" ADD COLUMN "params" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_DATA" DROP COLUMN IF EXISTS "vts";--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" DROP COLUMN IF EXISTS "vts";--> statement-breakpoint
ALTER TABLE "TNT_STROBE_DATA" DROP COLUMN IF EXISTS "vts";