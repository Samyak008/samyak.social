import "./../styles/globals.css";
import type { Metadata } from "next";
import SiteNav from "@/components/site-nav";
import CursorLight from "@/components/cursor-light";

export const metadata: Metadata = {
  title: "samyak.social",
  description: "Samyak Varia — blog, work, and gallery.",
  metadataBase: new URL("https://samyak.social"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="mx-auto max-w-5xl px-6">
          <SiteNav />
          <main className="py-8">{children}</main>
          <footer className="py-10 text-sm opacity-70">© {new Date().getFullYear()} Samyak Varia</footer>
        </div>
        <CursorLight />
      </body>
    </html>
  );
}
