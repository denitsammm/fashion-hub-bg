import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ModaPrice.BG — Сравни цените на модни дрехи и обувки в България",
  description: "Сравнение на цени в реално време на идентични модни артикули от About You, Fashion Days, Modivo, Answear, Best Secret и други магазини с доставка до България.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className="antialiased min-h-screen bg-slate-50 flex flex-col justify-between">
        {children}
        <footer className="bg-white border-t border-slate-200 mt-20 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
            <p className="font-semibold text-slate-700">ModaPrice.BG — Платформа за сравнение на цени на мода в България</p>
            <p className="mt-2">
              Сравнява в реално време цените от About You, About You Outlet, Fashion Days, Modivo, Answear, Best Secret и Remix.
            </p>
            <p className="mt-1 text-slate-400">
              Всички цени са в български лева (BGN) с включен ДДС и се обновяват редовно.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
