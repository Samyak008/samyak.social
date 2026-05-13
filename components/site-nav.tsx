"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/about", label: "ABOUT" },
  { href: "/blog", label: "BLOGS" },
  { href: "/work", label: "WORK" },
  { href: "/gallery", label: "DOCSHELF" },
] as const;

type SiteNavProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function SiteNav({ sidebarOpen, onToggleSidebar }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <nav className="top-nav">
      <div className="nav-inner">
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle sidebar"
          aria-controls="site-sidebar"
          aria-expanded={sidebarOpen}
          onClick={onToggleSidebar}
        >
          <span className="nav-toggle-bars" aria-hidden="true">
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </span>
        </button>
        <div className="nav-links">
          {tabs.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={active ? "active" : ""}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}