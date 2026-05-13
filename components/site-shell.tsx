"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import SiteNav from "@/components/site-nav";
import CursorLight from "@/components/cursor-light";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <>
      <div className={`layout-wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Sidebar onNavigate={closeSidebar} />
        <div className="main-content-wrapper">
          <SiteNav sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
          <main className="main-content">{children}</main>
          <footer className="content-footer">
            © {new Date().getFullYear()} Samyak Varia
          </footer>
        </div>
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close sidebar"
          aria-hidden={!sidebarOpen}
          tabIndex={sidebarOpen ? 0 : -1}
          onClick={closeSidebar}
        />
      </div>
      <CursorLight />
    </>
  );
}
