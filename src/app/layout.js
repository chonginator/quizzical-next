import { Inter, Karla } from "next/font/google";
import clsx from "clsx";

import { primaryFont, secondaryFont } from "./fonts";
import { COLOURS } from "@/constants";

import styles from "./globals.css";

export const metadata = {
  title: "Quizzical",
  description: "Let's get quizzical",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx(primaryFont.variable, secondaryFont.variable)}
      style={COLOURS}
    >
      <body>{children}</body>
    </html>
  );
}
