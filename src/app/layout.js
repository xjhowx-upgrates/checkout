import "@/sass/main.scss";
import { Cabin } from "next/font/google";

const cabin = Cabin({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Checkout | Wizzi",
  description:
    "É fácil, é tecnológico, isso é futurismo. A experiência Agência de Viagem + Cliente + Digital + Humana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={cabin.className}>{children}</body>
    </html>
  );
}
