export const metadata = {
  title: "Quizzical",
  description: "Let's get quizzical",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
