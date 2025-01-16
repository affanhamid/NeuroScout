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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, action } = credentials || {};

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        // Connect to MongoDB
        await connect();

        // Define or reuse the User model
        const User =
          mongoose.models.User ||
          mongoose.model(
            "User",
            new mongoose.Schema({
              email: { type: String, required: true, unique: true },
              password: { type: String, required: true },
              role: { type: String, default: "user" },
              organizationId: { type: String, default: "6765254294b4101df01adc7a" },
            })
          );

        if (action === "register") {
          // Handle registration
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            throw new Error("Email already registered");
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            email,
            password: hashedPassword,
            role: "user", // Default role
            organizationId: "6765254294b4101df01adc7a", // Default organizationId
          });
          await newUser.save();

          return { id: newUser._id, name: newUser.email };
        } else if (action === "login") {
          // Handle login
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            throw new Error("Invalid email or password");
          }

          return { id: user._id, name: user.email };
        }

        throw new Error("Invalid action");
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
