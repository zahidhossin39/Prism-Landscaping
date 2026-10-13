"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { LenisRef } from "lenis/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Safely resolves target DOM elements for hashes without crashing on invalid CSS selectors
 */
function getTargetElement(hash: string): HTMLElement | null {
  if (!hash || hash === "#" || hash === "#top") return null;
  const rawId = hash.startsWith("#") ? hash.slice(1) : hash;
  try {
    const decodedId = decodeURIComponent(rawId);
    const byId = document.getElementById(decodedId);
    if (byId) return byId;
  } catch {
    // ignore decodeURIComponent error
  }
  try {
    const byQuery = document.querySelector(hash);
    if (byQuery instanceof HTMLElement) return byQuery;
  } catch {
    // ignore syntax errors on non-standard selectors (e.g. '#/path' or '#123')
  }
  return null;
}

function SmoothScrollHandler() {
  const lenis = useLenis();
  const pathname = usePathname();

  // Expose lenis instance globally for programmatic control & testing
  useEffect(() => {
    if (!lenis) return;
    (window as unknown as { __lenis?: typeof lenis }).__lenis = lenis;

    return () => {
      delete (window as unknown as { __lenis?: typeof lenis }).__lenis;
    };
  }, [lenis]);

  // Handle body & html overflow locking (e.g. modals, drawers, lightbox)
  useEffect(() => {
    if (!lenis) return;

    const checkOverflow = () => {
      const isLocked =
        document.body.style.overflow === "hidden" ||
        document.documentElement.style.overflow === "hidden" ||
        document.body.classList.contains("overflow-hidden") ||
        document.documentElement.classList.contains("overflow-hidden");

      if (isLocked) {
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
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      observer.disconnect();
    };
  }, [lenis]);

  // Smoothly scroll to a hash with retry polling for client-rendered DOM nodes
  const scrollToHash = useCallback(
    (hash: string, immediate = false) => {
      if (!lenis) return;
      if (!hash || hash === "#") return;
      if (hash === "#top") {
        lenis.scrollTo(0, { immediate, duration: 1.2 });
        return;
      }

      let attempts = 0;
      const maxAttempts = 10;
      const checkAndScroll = () => {
        const target = getTargetElement(hash);
        if (target) {
          // Note: CSS html { scroll-padding-top: 5.5rem } already handles the 88px header offset
          lenis.scrollTo(target, { immediate, duration: 1.2 });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkAndScroll, 80);
        }
      };

      checkAndScroll();
    },
    [lenis]
  );

  // Handle smooth scrolling for internal anchor clicks
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
        if (targetHash === "#top") {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2 });
          if (window.location.hash !== "") {
            window.history.pushState(null, "", window.location.pathname);
          }
          return;
        }

        const targetElement = getTargetElement(targetHash);
        if (targetElement) {
          e.preventDefault();
          // CSS scroll-padding-top: 5.5rem handles sticky header offset automatically
          lenis.scrollTo(targetElement, { duration: 1.2 });
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

  // Handle hash changes via browser history (Back / Forward buttons)
  useEffect(() => {
    if (!lenis) return;

    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [lenis, scrollToHash]);

  // Handle route change and initial page mount
  useEffect(() => {
    if (!lenis) return;

    if (window.location.hash) {
      scrollToHash(window.location.hash, false);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis, scrollToHash]);

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08, // Silky Framer-standard momentum physics (duration omitted so lerp is active)
        smoothWheel: true,
        wheelMultiplier: 1.15, // Responsive momentum boost
        touchMultiplier: 1.0,
        infinite: false,
        autoResize: true,
        autoRaf: true,
        overscroll: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        virtualScroll: ({ event }) => {
          // Keep touch interactions 100% native on mobile devices
          if (event.type.includes("touch")) {
            return false;
          }
          return true;
        },
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
