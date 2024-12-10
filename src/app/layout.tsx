import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "./_components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Forum",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${GeistSans.variable}`}
    >
      <ClerkProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
