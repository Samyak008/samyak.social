"use client";
import Link from "next/link";
import { FaYoutube, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const socialLinks = [
  { name: "YouTube", url: "https://www.youtube.com/@Samyak008", icon: <FaYoutube /> },
  { name: "Linkedin", url: "https://www.linkedin.com/in/s08varia/", icon: <FaLinkedin /> },
  { name: "Twitter", url: "https://x.com/Hathimeresaathi", icon: <FaTwitter /> },
  { name: "GitHub", url: "https://github.com/Samyak008", icon: <FaGithub /> },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Brand */}
        <div className="sidebar-brand">
          <Link href="/home" className="brand-link">
            <h2>HOME</h2>
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
        </div>
      </div>
    </aside>
  );
}