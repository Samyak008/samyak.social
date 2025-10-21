"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/about", label: "ABOUT" },
  { href: "/blog", label: "BLOGS" },
  { href: "/work", label: "WORK" },
  { href: "/gallery", label: "DOCSHELF" },
] as const;

export default function SiteNav() {
  const pathname = usePathname();
  
  return (
    <nav className="top-nav">
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
    </nav>
  );
}