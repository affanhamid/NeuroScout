import mongoose from "mongoose";
mongoose.set("debug", true);
import dotenv from "../../../frontend/node_modules/dotenv/lib/main";
dotenv.config({ path: ".env.local" });

export const connect = async () => {
  await mongoose.connect(process.env.DOCUMENT_URI as string, {
    autoIndex: true,
    readPreference: "primary"
  });
};

export const disconnect = async () => {
  await mongoose.disconnect();
};
