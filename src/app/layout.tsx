import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";


export const metadata: Metadata = {
  title: "NeuroScout",
  description:
    "NeuroScout is a football talent-acquisition platform through cognitive assessments"
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>

    </html>
  );
}
