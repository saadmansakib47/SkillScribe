import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AIAssistant from "@/components/ai/AIAssistant";
import { CartProvider } from "@/contexts/CartContext";
import { Raleway } from 'next/font/google';
import { WishlistProvider } from "@/contexts/WishlistContext";

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
        className={`${raleway.className} bg-neutral-50 text-neutral-900 antialiased`}
      >
        <CartProvider>
          <WishlistProvider>
            {/* Sticky Navbar */}
            <div className="fixed top-0 left-0 w-full z-[100]">
              <Navbar />
            </div>

            {/* Main content */}
            <main className="pt-16">
              {children}
            </main>

            {/* AI Assistant - Floating on all pages */}
            <AIAssistant />

            {/* Footer */}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
