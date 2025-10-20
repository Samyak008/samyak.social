import "./../styles/globals.css";
import type { Metadata } from "next";
import SiteNav from "@/components/site-nav";
import Sidebar from "@/components/sidebar";
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
        <div className="layout-wrapper">
          <Sidebar />
          <div className="main-content-wrapper">
            <SiteNav />
            <main className="main-content">{children}</main>
            <footer className="content-footer">© {new Date().getFullYear()} Samyak Varia</footer>
          </div>
        </div>
        <CursorLight />
      </body>
    </html>
  );
}
