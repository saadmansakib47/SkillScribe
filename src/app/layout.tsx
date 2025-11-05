import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { CartProvider } from "@/contexts/CartContext";
import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // adjust
})

export const metadata = {
  title: "SkillScribe | Learn Anytime, Grow Every Day",
  description:
    "Master new skills through expert-led video courses and personalized learning paths.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-neutral-50 text-neutral-900 antialiased`}
      >
        <CartProvider>
          {/* Sticky Navbar */}
          <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />
          </div>

          {/* Main content */}
          <main className="pt-16">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
