'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/common/Navbar";
import StoreProvider from "./providers/StoreProvider";
import { AuthCheck } from "./components/HOC/AuthCheck";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
            <AuthCheck>
              <div>
                <Navbar />
                {children}
              </div>
            </AuthCheck>
        </StoreProvider>
        </body>
    </html>
  );
}
