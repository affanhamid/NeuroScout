import type { Metadata } from "next";
import "./globals.css";
import { getSession } from "./api/auth/[...nextauth]/auth";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "NeuroScout",
  description:
    "NeuroScout is a football talent-acquisition platform through cognitive assessments",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
