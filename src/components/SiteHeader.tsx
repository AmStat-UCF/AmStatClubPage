import Link from "next/link";
import { links } from "@/content/site";
import Logo from "./Logo";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="wrap">
        <Link className="brand" href="/" aria-label="AmStat@UCF home">
          <Logo variant="compact" />
        </Link>
        <nav className="site-nav" aria-label="Main">
          <ul>
            <li><NavLink href="/about">About</NavLink></li>
            <li><NavLink href="/officers">Officers</NavLink></li>
            <li><a className="ext" href={links.datathon}>Datathon</a></li>
            <li><a className="btn" href={links.discord}>Join Discord</a></li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
