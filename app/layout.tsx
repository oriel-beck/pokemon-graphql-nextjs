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
    images: [
      "https://i2.milimaj.com/i/milliyet/75/869x477/5ef1c7cd55427e1ad86ae789.jpg"
    ],
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
