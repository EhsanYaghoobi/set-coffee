import ScrollToTop from "@/utils/ScrollToTop";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SET Coffee",
  description: "SET Coffee project with Next v.13",
  icons: {
    icon: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/36190/coffee-logo-clipart-md.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body className={inter.className}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
