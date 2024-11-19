import type { Metadata } from "next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Gạo Nails",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Suspense fallback={<Loading />}>
            <div className="min-h-screen bg-pink-50">
              <Header />
              {children}
              <Footer />
            </div>
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
