import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { CssBaseline } from "@mui/material";
import { Prompt } from "next/font/google";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import IconUp from "@/components/icons/IconUp";
// import "./styles.css";

const prompt = Prompt({
  subsets: ["latin", "thai"], // สำคัญมาก
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-prompt",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Center for Autism Development (CAD)",
  description:
    "At CAD, our purpose is to empower individuals with neurodiversity and their families to live the most self-fulfilling and independent lives possible.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    // <html lang="en" className={roboto.variable}>
    <html lang="en" className={prompt.variable}>
      {/* <html lang="en" className={ibm.className}> */}
      <head>
        <title>Center for Autism Development (CAD)</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-[100dvw] overflow-x-hidden`}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <ResponsiveAppBar /> */}
            <div className="w-dvw overflow-x-hidden">
              <Navbar />
              {children}
              <Link
                href={"#nav"}
                className="fixed right-8 bottom-8 size-[3rem] flex justify-center items-center rounded-md bg-(--neutral-100) hover:bg-(--c) transition-all cursor-pointer shadow text-[2rem] text-(--c) hover:text-(--neutral-100)"
              >
                <IconUp />
              </Link>
              <Footer />
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
