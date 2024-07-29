'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/common/Navbar";
import StoreProvider from "./providers/StoreProvider";
import { AuthCheck } from "./components/HOC/AuthCheck";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <AuthCheck>
                <div>
                  <Navbar />
                  {children}
                  <Toaster richColors />
                  <div id="modal--container" />
                </div>
            </AuthCheck>
          </QueryClientProvider>
        </StoreProvider>
        </body>
    </html>
  );
}
