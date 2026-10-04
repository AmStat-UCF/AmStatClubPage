// Design directions being compared during drafting.
// Pick one, set it as `defaultVariant`, and turn off `showDesignSwitcher` before launch.

export const variants = [
  { id: "journal", letter: "A", name: "Journal" },
  { id: "midnight", letter: "B", name: "Midnight" },
  { id: "swiss", letter: "C", name: "Swiss" },
  { id: "varsity", letter: "D", name: "Varsity" },
] as const;

export type VariantId = (typeof variants)[number]["id"];

export const defaultVariant: VariantId = "journal";
export const showDesignSwitcher = true;
export const variantStorageKey = "amstat-variant";

// Runs before first paint: marks JS as available (enables reveal animations)
// and applies a saved or ?variant= design so the page doesn't flash the default.
export const bootScript = `(function(){var d=document.documentElement;d.setAttribute('data-js','');try{var ok=${JSON.stringify(
  variants.map((v) => v.id),
)};var q=new URLSearchParams(location.search).get('variant');var v=q||localStorage.getItem('${variantStorageKey}');if(ok.indexOf(v)>-1){d.setAttribute('data-variant',v);if(q)localStorage.setItem('${variantStorageKey}',v);}}catch(e){}})();`;
