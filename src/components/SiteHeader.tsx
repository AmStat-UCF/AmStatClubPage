import Image from "next/image";
import Link from "next/link";
import mark from "@/assets/mark-on-dark.png";
import { links } from "@/content/site";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="wrap">
        <Link className="brand" href="/" aria-label="AmStat@UCF home">
          <Image src={mark} alt="" width={29} height={42} loading="eager" />
          <span className="wordmark">
            <span className="am">AmStat</span>
            <span className="ucf">UCF</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          <ul>
            <li><NavLink href="/about">About</NavLink></li>
            <li><NavLink href="/officers">Officers</NavLink></li>
            <li><a className="ext" href={links.datathon}>Datathon</a></li>
            <li><a className="btn btn-gold" href={links.discord}>Join Discord</a></li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
