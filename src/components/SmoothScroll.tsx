"use client";

import React, { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { LenisRef } from "lenis/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

function SmoothScrollHandler() {
  const lenis = useLenis();
  const pathname = usePathname();
  const initialHashHandled = useRef(false);

  // Expose lenis instance globally for programmatic control & debugging
  useEffect(() => {
    if (!lenis) return;
    (window as unknown as { __lenis?: typeof lenis }).__lenis = lenis;

    return () => {
      delete (window as unknown as { __lenis?: typeof lenis }).__lenis;
    };
  }, [lenis]);

  // Handle body overflow locking (e.g. modals, drawers, lightbox)
  useEffect(() => {
    if (!lenis) return;

    const checkOverflow = () => {
      const isBodyLocked =
        document.body.style.overflow === "hidden" ||
        document.documentElement.classList.contains("overflow-hidden");

      if (isBodyLocked) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    checkOverflow();

    const observer = new MutationObserver(checkOverflow);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      observer.disconnect();
    };
  }, [lenis]);

  // Handle smooth scrolling for anchor links clicked on the page
  useEffect(() => {
    if (!lenis) return;

    const handleAnchorClick = (e: MouseEvent) => {
      // Find nearest link ancestor
      const link = (e.target as Element | null)?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignore standard protocols and external URLs
      if (
        href.startsWith("http:") ||
        href.startsWith("https:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.getAttribute("target") === "_blank"
      ) {
        return;
      }

      // Check if this link points to a hash anchor on the current page
      let targetHash: string | null = null;
      if (href.startsWith("#") && href.length > 1) {
        targetHash = href;
      } else if (href.includes("#")) {
        try {
          const url = new URL(href, window.location.href);
          if (
            url.pathname === window.location.pathname &&
            url.search === window.location.search &&
            url.hash
          ) {
            targetHash = url.hash;
          }
        } catch {
          // invalid url ignored
        }
      }

      if (targetHash) {
        const targetElement = document.querySelector(targetHash);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -88,
            duration: 1.2,
          });
          if (window.location.hash !== targetHash) {
            window.history.pushState(null, "", targetHash);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [lenis]);

  // Handle initial page load with hash, or client navigation with hash
  useEffect(() => {
    if (!lenis) return;

    if (window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -88,
            duration: 1.2,
            immediate: false,
          });
        }
      }, initialHashHandled.current ? 80 : 250);
      initialHashHandled.current = true;
      return () => clearTimeout(timer);
    }
  }, [lenis, pathname]);

  // On page change without hash, scroll to top cleanly
  useEffect(() => {
    if (!lenis) return;
    if (!window.location.hash) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.09, // Silky momentum interpolation matching Framer standard
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.05, // Crisp, responsive boost
        touchMultiplier: 1.5,
        infinite: false,
        autoResize: true,
        autoRaf: true,
        overscroll: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        prevent: (node) => {
          return (
            node.hasAttribute("data-lenis-prevent") ||
            Boolean(node.closest("[data-lenis-prevent]"))
          );
        },
      }}
    >
      <SmoothScrollHandler />
      {children}
    </ReactLenis>
  );
}

export { useLenis };
