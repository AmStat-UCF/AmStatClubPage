import Link from "next/link";
import SplitWords from "./SplitWords";

export default function PageHead({ crumb, title, lede }: { crumb: string; title: string; lede: string }) {
  return (
    <header className="page-head">
      <div className="wrap">
        <ol className="crumbs label" aria-label="Breadcrumb">
          <li><Link href="/">Home</Link></li>
          <li aria-current="page">{crumb}</li>
        </ol>
        <h1><SplitWords text={title} /></h1>
        <div className="intro-seq">
          <p className="page-lede">{lede}</p>
        </div>
      </div>
    </header>
  );
}
