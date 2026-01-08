import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ident Agora",
  description: "Identity and Verifiable Credentials Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
