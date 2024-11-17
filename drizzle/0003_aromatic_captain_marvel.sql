ALTER TABLE "tnt_glow_param" ADD PRIMARY KEY ("param_id");--> statement-breakpoint
ALTER TABLE "tnt_glow_param" ALTER COLUMN "param_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tnt_param" ADD PRIMARY KEY ("param_id");--> statement-breakpoint
ALTER TABLE "tnt_param" ALTER COLUMN "param_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tnt_strobe_param" ADD PRIMARY KEY ("param_id");--> statement-breakpoint
ALTER TABLE "tnt_strobe_param" ALTER COLUMN "param_id" SET NOT NULL;