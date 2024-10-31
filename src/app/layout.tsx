import type { Metadata } from "next";
import "./globals.css";

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
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        {/* <Navbar /> */}
      </body>
    </html>
  );
}
