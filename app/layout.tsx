import "./globals.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon wiki",
  description: "Search pokemons, abilities, moves and items. All of your pokemon related information in one place!",
  openGraph: {
    url: "https://pokemon-graphql-nextjs.vercel.app"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header></Header>
          {children}
          <Footer></Footer>
      </body>
    </html>
  )
}
