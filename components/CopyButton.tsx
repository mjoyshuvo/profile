"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Copies a string and says so for a moment. Hidden without JavaScript
 * (`html:not(.js) .copy-button`), where it could do nothing; the text it
 * copies is on the page beside it either way.
 */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={`copy-button inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 font-display text-xs font-semibold transition-colors ${
        copied
          ? "bg-teal text-on-teal"
          : "bg-teal-wash text-teal-strong hover:bg-teal hover:text-on-teal"
      }`}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
