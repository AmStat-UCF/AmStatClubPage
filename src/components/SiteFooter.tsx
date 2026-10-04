import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo-on-dark.png";
import { links, site } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer on-dark">
      <div className="wrap">
        <div className="footer-grid">
          <Image src={logo} alt="AmStat UCF logo" width={104} height={135} />
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
          <span>Orlando, Florida</span>
        </div>
      </div>
    </footer>
  );
}
