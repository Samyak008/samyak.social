import "./../styles/globals.css";
import type { Metadata } from "next";
import SiteShell from "@/components/site-shell";

export const metadata: Metadata = {
  title: "samyak.social",
  description: "Samyak Varia — blog, work, and gallery.",
  metadataBase: new URL("https://samyak.social"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
