import { config } from "@/config";
import { cookieToInitialState } from "@account-kit/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { AccountKitProvider } from "@/providers/AccountKitProvider";
import { ToastContainer, toast } from 'react-toastify';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RCH NFT",
  description: "Claim your RCH NFT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined
  );
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AccountKitProvider initialState={initialState}>{children}</AccountKitProvider>
      </body>
      <ToastContainer style={{position:"absolute", top:"30%" , left: "50%"}} />
    </html>
  );
}
