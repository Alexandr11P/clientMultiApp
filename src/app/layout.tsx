import type { Metadata } from "next";
import "../styles/globals.css";
import "normalize.css"
import AppQueryClientProvider from "@/components/AppQueryClientProvider";
import StoreProvider from "@/components/StoreProvider";
import Body from "@/components/Body/Body";


export const metadata: Metadata = {
  title: "Multi PET APP",
  description: "Next pet app by Alexandr P",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ru">
      <StoreProvider>
        <AppQueryClientProvider>
          <Body>{children}</Body>
        </AppQueryClientProvider>
      </StoreProvider>
    </html>
  );
}
