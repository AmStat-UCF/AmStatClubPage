"use client";

import { useSyncExternalStore } from "react";
import { defaultVariant, variants, variantStorageKey, type VariantId } from "@/content/design";

// Draft-only control for flipping between design directions.

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-variant"] });
  return () => mo.disconnect();
}

const getVariant = () => document.documentElement.dataset.variant ?? defaultVariant;

function applyVariant(id: VariantId) {
  document.documentElement.setAttribute("data-variant", id);
  try {
    localStorage.setItem(variantStorageKey, id);
  } catch {
    // storage can be unavailable (private mode); the choice just won't persist
  }
}

export default function VariantSwitcher() {
  const current = useSyncExternalStore(subscribe, getVariant, () => defaultVariant);

  return (
    <div className="switcher" role="group" aria-label="Design direction (draft)">
      <span>Design</span>
      {variants.map((v) => (
        <button key={v.id} type="button" aria-pressed={current === v.id} onClick={() => applyVariant(v.id)} title={v.name}>
          <b>{v.letter}</b> <i>{v.name}</i>
        </button>
      ))}
    </div>
  );
}
