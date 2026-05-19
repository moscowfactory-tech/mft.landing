"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const DefaultAboutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const DefaultServicesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const DefaultCasesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" />
  </svg>
);

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

export const defaultNavItems: NavItem[] = [
  { id: "home", icon: <DefaultHomeIcon />, label: "Главная" },
  { id: "about", icon: <DefaultAboutIcon />, label: "О нас" },
  { id: "services", icon: <DefaultServicesIcon />, label: "Услуги" },
  { id: "cases", icon: <DefaultCasesIcon />, label: "Кейсы" },
];

export type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems: NavItem[] = items.map((item) => {
    if (item.onClick) return item;

    if (item.id === "home") {
      return {
        ...item,
        onClick: () => {
          if (typeof window === "undefined") return;
          if (pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            router.push("/");
          }
        },
      };
    }

    if (item.id === "about") {
      return {
        ...item,
        onClick: () => {
          if (typeof window === "undefined") return;
          if (pathname === "/") {
            const section = document.getElementById("about");
            if (section) {
              section.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          } else {
            router.push("/#about");
          }
        },
      };
    }

    if (item.id === "services") {
      return {
        ...item,
        onClick: () => {
          if (typeof window === "undefined") return;
          if (pathname === "/") {
            const section = document.getElementById("services");
            if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            router.push("/#services");
          }
        },
      };
    }

    if (item.id === "cases") {
      return {
        ...item,
        onClick: () => router.push("/cases"),
      };
    }

    return item;
  });

  const getInitialActiveIndex = () => {
    if (pathname === "/cases") {
      const idx = navItems.findIndex((item) => item.id === "cases");
      if (idx !== -1) return idx;
    }
    if (pathname.startsWith("/services")) {
      const idx = navItems.findIndex((item) => item.id === "services");
      if (idx !== -1) return idx;
    }
    if (pathname === "/") {
      const idx = navItems.findIndex((item) => item.id === "home");
      if (idx !== -1) return idx;
    }
    return defaultActiveIndex;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialActiveIndex);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (pathname === "/cases") {
      const idx = navItems.findIndex((item) => item.id === "cases");
      if (idx !== -1) setActiveIndex(idx);
    } else if (pathname.startsWith("/services")) {
      const idx = navItems.findIndex((item) => item.id === "services");
      if (idx !== -1) setActiveIndex(idx);
    } else if (pathname === "/") {
      const idx = navItems.findIndex((item) => item.id === "home");
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const navRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (navItems.length === 0) return;

    const limelight = limelightRef.current;
    const nav = navRef.current;
    const iconEl = iconRefs.current[activeIndex];
    const labelEl = labelRefs.current[activeIndex];

    if (limelight && nav && iconEl) {
      const navRect = nav.getBoundingClientRect();
      const iconRect = iconEl.getBoundingClientRect();

      const left = iconRect.left - navRect.left;

      let right = iconRect.right - navRect.left;
      if (labelEl) {
        const labelRect = labelEl.getBoundingClientRect();
        const labelRight =
          labelRect.left - navRect.left + labelEl.scrollWidth;
        right = Math.max(right, labelRight);
      }

      const width = Math.max(right - left, 0);

      limelight.style.width = `${width}px`;
      limelight.style.left = `${left}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, navItems]);

  if (navItems.length === 0) {
    return null;
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav
      ref={navRef}
      className={`relative inline-flex h-16 items-center rounded-xl border border-white/15 bg-black/50 px-2 text-zinc-50 backdrop-blur-md ${
        className ?? ""
      }`}
    >
      {navItems.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-5 ${
            iconContainerClassName ?? ""
          }`}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
        >
          <span
            ref={(el: HTMLSpanElement | null) => {
              iconRefs.current[index] = el;
            }}
            className={`h-6 w-6 transition-opacity duration-100 ease-in-out ${
              activeIndex === index ? "opacity-100" : "opacity-40"
            } ${iconClassName ?? ""}`}
          >
            {icon}
          </span>
          {label && (
            <span
              ref={(el: HTMLSpanElement | null) => {
                labelRefs.current[index] = el;
              }}
              className={`ml-2 whitespace-nowrap text-sm font-medium transition-opacity duration-150 hidden sm:inline ${
                activeIndex === index ? "text-zinc-100 opacity-100" : "text-zinc-400 opacity-70"
              }`}
            >
              {label}
            </span>
          )}
        </a>
      ))}

      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 h-[5px] rounded-full bg-indigo-500/70 ${
          isReady ? "transition-[left,width] duration-400 ease-in-out" : ""
        } ${limelightClassName ?? ""}`}
        style={{ left: "-999px", width: 0 }}
      >
        <div className="pointer-events-none absolute left-[-30%] top-[5px] h-14 w-[160%] bg-gradient-to-b from-indigo-500/20 to-transparent [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)]" />
      </div>
    </nav>
  );
};
