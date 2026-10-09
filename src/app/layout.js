import Analytics from "./Components/Analytics";
import WhatsAppWidget from "./Components/WhatsAppWidget";
import { AuthProvider } from "./context/AuthContext";
// import { AuthProvider } from "@/context/AuthContext"; 
import "./globals.css";

import { DM_Sans, Inter } from 'next/font/google'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: "KEC Biofuel- Farm to Fuel",
  description: "KEC Biofuel produces clean CBG from agricultural waste, empowering farmers and delivering sustainable, eco-friendly energy solutions.",
  icons: {
    icon: "/images/Kecicon.jpeg"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body className={dmSans.className}>
        <AuthProvider>
          {children}
          <Analytics/>
          <WhatsAppWidget/>
        </AuthProvider>
      </body>
    </html>
  );
}