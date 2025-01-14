import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/lib/db";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};

        if (!username || !password) {
          throw new Error("Missing username or password");
        }

        // Connect to MongoDB
        await connect();

        // Define or reuse the User model
        const User =
          mongoose.models.User ||
          mongoose.model(
            "User",
            new mongoose.Schema({
              username: { type: String, required: true },
              password: { type: String, required: true }, // hashed password
            })
          );

        // Find the user in the database
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid username or password");
        }

        // Validate the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid username or password");
        }

        // Return user object without sensitive information
        return { id: user._id, name: user.username };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
