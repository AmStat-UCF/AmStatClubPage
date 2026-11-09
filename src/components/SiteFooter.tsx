import Link from "next/link";
import { links, site } from "@/content/site";
import Logo from "./Logo";
import StarField from "./StarField";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <StarField />
      <div className="wrap">
        <div className="footer-grid">
          <Logo className="footer-logo" label={site.name} />
          <div>
            <p className="org">{site.fullName}</p>
            <p>A registered student organization and chapter of the American Statistical Association.</p>
            <p><a className="footer-mail" href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
          <ul className="footer-links">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/officers">Officers</Link></li>
            <li><a className="ext" href={links.datathon}>Datathon</a></li>
            <li><a className="ext" href={links.discord}>Discord</a></li>
            <li><a className="ext" href={links.instagram}>Instagram</a></li>
            <li><a className="ext" href={links.linkedin}>LinkedIn</a></li>
          </ul>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>28.60° N, 81.20° W · Orlando, Florida</span>
        </div>
      </div>
    </footer>
  );
}
