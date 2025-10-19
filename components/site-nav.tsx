"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
];

export default function SiteNav() {
  const pathname = usePathname();
  return (
    <nav className="site-nav">
      <div className="container nav-inner">
        <div className="site-brand">
          <Link href="/home">samyak.social</Link>
        </div>

        <div className="nav-links">
          {tabs.map(t => {
            const active = pathname === t.href || (t.href === "/home" && pathname === "/");
            return (
              <Link
                key={t.href}
                href={t.href as any}
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
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
