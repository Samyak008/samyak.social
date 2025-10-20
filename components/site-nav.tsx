"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/home", label: "ABOUT" },
  { href: "/blog", label: "VLOGS" },
  { href: "/work", label: "WORK" },
  { href: "/gallery", label: "DOCSHELF" },
];

export default function SiteNav() {
  const pathname = usePathname();
  
  return (
    <nav className="top-nav">
      <div className="nav-links">
        {tabs.map((t) => {
          const active = pathname === t.href || (t.href === "/home" && pathname === "/");
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