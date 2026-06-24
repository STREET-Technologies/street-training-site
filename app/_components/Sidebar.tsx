"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection } from "@/lib/content";

export function Sidebar({ nav }: { nav: NavSection[] }) {
  const pathname = usePathname();
  return (
    <nav className="sidebar" aria-label="Guide sections">
      {nav.map((section) => (
        <div className="sidebar__group" key={section.label}>
          <p className="sidebar__title">{section.label}</p>
          <ul className="sidebar__list">
            {section.items.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="sidebar__link"
                    aria-current={current ? "page" : undefined}
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
  );
}
