import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Beauti Luuk | Premium Skincare & Cosmetics",
  description: "Explore the Beauti Luuk collection of organic face washes, moisturising creams, and hydrating body lotions. Formulated for all skin types.",
  verification: {
    google: "MXr25aLDA4t4DhmGdxLpaRWrDRqUOl8qy8W_s0ng2Ec",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="MXr25aLDA4t4DhmGdxLpaRWrDRqUOl8qy8W_s0ng2Ec" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
