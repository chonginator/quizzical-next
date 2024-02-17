import { Inter, Karla } from "next/font/google";

export const primaryFont = Inter({
  subsets: ["latin"],
  weight: "variable",
  display: "fallback",
  variable: "--font-family-primary",
});

export const secondaryFont = Karla({
  subsets: ["latin"],
  weight: "variable",
  display: "fallback",
  variable: "--font-family-secondary",
});
