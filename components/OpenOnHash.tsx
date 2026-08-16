"use client";

import { useEffect } from "react";

/**
 * Opens the disclosure inside whichever element the URL hash points at, so a
 * case-study link from Experience lands in the open case study rather than on
 * its closed summary row.
 *
 * Progressive enhancement, nothing more: without JavaScript the reader lands on
 * the summary and opens it themselves, and the prose is in the DOM either way —
 * the disclosure is a visual clamp, not a containment boundary. Renders nothing,
 * so `Projects` stays a server component.
 */
export function OpenOnHash() {
  useEffect(() => {
    function open() {
      if (!location.hash) return;
      // getElementById, not querySelector(location.hash): a hash that isn't a
      // valid selector — "#2", say — throws there and would take the page down.
      const target = document.getElementById(
        decodeURIComponent(location.hash.slice(1)),
      );
      target?.querySelector("details")?.setAttribute("open", "");
    }

    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return null;
}
