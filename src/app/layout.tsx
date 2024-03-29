import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./navigation";
import { AuthContextProvider } from "@/context/authcontext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Some Like It Hot",
  description: "Fredonia's Premier All Female A Cappella Group",
};

function Footer() {
  return (
        <footer>
            <p>Thank you for visiting our site!</p>
            <p>Send us a message: <a href="mailto:fredoniasomelikeithot@gmail.com">fredoniasomelikeithot@gmail.com</a></p>
        </footer>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Navigation />
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
