import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "normalize.css"
import AppQueryClientProvider from "@/components/AppQueryClientProvider";
import StoreProvider from "@/components/StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi PET APP",
  description: "Next pet app by Alexandr P",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ru">
      <StoreProvider>
        <AppQueryClientProvider>
          <body className={inter.className}>{children}</body>
        </AppQueryClientProvider>
      </StoreProvider>
    </html>
  );
}
