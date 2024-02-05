import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  preload: true,
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Toaster />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
