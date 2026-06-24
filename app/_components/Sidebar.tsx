"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection } from "@/lib/content";

export function Sidebar({ nav }: { nav: NavSection[] }) {
  const pathname = usePathname();
  const current = nav.flatMap((s) => s.items).find((i) => i.href === pathname);

  return (
    <details className="guidenav">
      <summary className="guidenav__summary">
        <span>{current ? current.title : "Browse the guide"}</span>
        <svg className="guidenav__chev" width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </summary>
      <nav className="sidebar" aria-label="Guide sections">
        {nav.map((section) => (
          <div className="sidebar__group" key={section.label}>
            <p className="sidebar__title">{section.label}</p>
            <ul className="sidebar__list">
              {section.items.map((item) => {
                const isCurrent = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="sidebar__link"
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      <span className="sidebar__dot" />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </details>
  );
}
