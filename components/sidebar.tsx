"use client";
import Link from "next/link";

const socialLinks = [
  { name: "YouTube", url: "https://www.youtube.com/@Samyak008", icon: "▶" },
  { name: "Linkedin", url: "https://www.linkedin.com/in/s08varia/", icon: "📚" },
  { name: "Twitter", url: "https://x.com/Hathimeresaathi", icon: "𝕏" },
  { name: "GitHub", url: "https://github.com/Samyak008", icon: "⚙" },
];  

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Brand */}
        <div className="sidebar-brand">
          <Link href="/home" className="brand-link">
            <h2>samyak.social</h2>
          </Link>
        </div>

        {/* Social Links */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">SOCIAL</h3>
          <div className="social-links">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="social-icon">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Tags - Will be populated from blog posts */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">TAGS</h3>
          <p className="text-muted-small">Tags will appear here as you add blog posts</p>
        </div>
      </div>
    </aside>
  );
}