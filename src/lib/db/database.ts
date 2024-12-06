import mongoose from "mongoose";
mongoose.set("debug", true);
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export const connect = async () => {
  await mongoose.connect(process.env.DOCUMENT_URI as string, {
    tlsCAFile: "global-bundle.pem",
    autoIndex: true
  });
};

export const disconnect = async () => {
  await mongoose.disconnect();
};
