import React from "react";
import { Poppins } from "next/font/google";
import { HeroUIProvider } from "@heroui/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
});

export default function DefaultLayout({ children }) {
  return (
    <div className={poppins.className}>
      <HeroUIProvider>
        <main>{children}</main>
      </HeroUIProvider>
    </div>
  );
}
