import React from "react";
import { Montserrat } from "next/font/google";
import { HeroUIProvider } from "@heroui/react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], 
  variable: "--font-montserrat", 
});

export default function DefaultLayout({ children }) {
  return (
    <div className={montserrat.className}>
      <HeroUIProvider>
        <main>{children}</main>
      </HeroUIProvider>
    </div>
  );
}
