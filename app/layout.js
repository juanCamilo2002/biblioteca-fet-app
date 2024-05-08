import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/context/Providers";
import Notification from "./components/notification/Notification";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "900"],
  fontFamily: "Poppins",
  fontDisplay: "swap",
  fontStyle: "sans-serif",
});

export const metadata = {
  title: "Biblioteca FET",
  description: "Biblioteca universitaria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          {children}
          <Notification />
        </Providers>
      </body>
    </html>
  );
}
