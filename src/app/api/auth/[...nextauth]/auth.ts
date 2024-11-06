import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID as string,
      clientSecret: process.env.AUTH0_SECRET as string,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
