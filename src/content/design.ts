// Design settings.
// Journal is the chosen direction. The others stay reachable with ?variant= while drafting;
// delete them (and their fonts in layout.tsx) once they're no longer needed for reference.

export const variants = [
  { id: "journal", letter: "A", name: "Journal" },
  { id: "midnight", letter: "B", name: "Midnight" },
  { id: "swiss", letter: "C", name: "Swiss" },
  { id: "varsity", letter: "D", name: "Varsity" },
] as const;

export type VariantId = (typeof variants)[number]["id"];

export const defaultVariant: VariantId = "journal";
export const showDesignSwitcher = false;
export const variantStorageKey = "amstat-variant";

export type Theme = "light" | "dark";
export const themeStorageKey = "amstat-theme";

// Runs before first paint so the page never flashes the wrong look:
// - marks JS as available (enables reveal animations)
// - applies a saved or ?variant= design direction
// - applies the saved theme, or the visitor's OS preference if they haven't chosen one
export const bootScript = `(function(){var d=document.documentElement;d.setAttribute('data-js','');try{var ok=${JSON.stringify(
  variants.map((v) => v.id),
)};var q=new URLSearchParams(location.search).get('variant');var v=q||localStorage.getItem('${variantStorageKey}');if(ok.indexOf(v)>-1){d.setAttribute('data-variant',v);if(q)localStorage.setItem('${variantStorageKey}',v);}}catch(e){}var t;try{t=localStorage.getItem('${themeStorageKey}');}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.setAttribute('data-theme',t);})();`;
