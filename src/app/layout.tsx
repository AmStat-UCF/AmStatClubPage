import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans, Newsreader, Schibsted_Grotesk } from "next/font/google";
import ScrollDirection from "@/components/ScrollDirection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import VariantSwitcher from "@/components/VariantSwitcher";
import { bootScript, defaultVariant, showDesignSwitcher } from "@/content/design";
import { site } from "@/content/site";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/home.css";
import "@/styles/pages.css";
import "@/styles/variants.css";
import "@/styles/motion.css";

const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], axes: ["opsz"] });
const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });
// Only used by the Swiss and Varsity design directions
const schibsted = Schibsted_Grotesk({ variable: "--font-schibsted", subsets: ["latin"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });

const fontVars = [newsreader, plexSans, plexMono, schibsted, archivo].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  title: {
    default: `${site.name} · American Statistical Association at UCF`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: "The big tent for statistics at UCF.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The boot script sets data-js, data-theme, and possibly data-variant before hydration
    <html lang="en" className={fontVars} data-variant={defaultVariant} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollDirection />
        {showDesignSwitcher && <VariantSwitcher />}
      </body>
    </html>
  );
}
