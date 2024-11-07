ALTER TABLE "TNT_PARAMS" ALTER COLUMN "in_use" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_PARAMS" ADD COLUMN "in_use" boolean;--> statement-breakpoint
ALTER TABLE "TNT_STROBE_PARAMS" ADD COLUMN "in_use" boolean;--> statement-breakpoint
ALTER TABLE "TNT_FLASH_DATA" DROP COLUMN IF EXISTS "in_use";--> statement-breakpoint
ALTER TABLE "TNT_STROBE_DATA" DROP COLUMN IF EXISTS "in_use";