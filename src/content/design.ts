// Theme settings. Light is the day sky, dark is the night sky (see styles/tokens.css).

export type Theme = "light" | "dark";
export const themeStorageKey = "amstat-theme";

// Runs before first paint so the page never flashes the wrong theme:
// - marks JS as available (enables reveal animations)
// - applies the saved theme, or the visitor's OS preference if they haven't chosen one
export const bootScript = `(function(){var d=document.documentElement;d.setAttribute('data-js','');var t;try{t=localStorage.getItem('${themeStorageKey}');}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.setAttribute('data-theme',t);})();`;
