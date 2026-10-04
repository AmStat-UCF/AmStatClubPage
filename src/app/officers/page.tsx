import type { Metadata } from "next";
import OfficerCard from "@/components/OfficerCard";
import PageHead from "@/components/PageHead";
import { delay } from "@/lib/motion";
import { board, directors, term } from "@/content/officers";
import { links, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Officers",
  description: `The ${term} AmStat@UCF executive board and directors.`,
};

export default function OfficersPage() {
  return (
    <>
      <PageHead
        crumb="Officers"
        title="The people running the club."
        lede={`Twelve students make up the ${term} board. Message any of us on Discord, or email the officers directly if you’d rather.`}
      />

      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal="">
            <h2>Executive board</h2>
            <p>Elected each spring. Responsible for the budget, the calendar, and the club’s standing with UCF and the ASA.</p>
          </div>
          <ul className="officer-grid is-board" data-reveal="stagger">
            {board.map((officer, i) => (
              <OfficerCard key={officer.role} officer={officer} number={i + 1} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal="">
            <h2>Directors</h2>
            <p>Each runs one part of what we do, from workshops and projects to the datathon.</p>
          </div>
          <ul className="officer-grid" data-reveal="stagger">
            {directors.map((officer, i) => (
              <OfficerCard key={officer.name} officer={officer} number={board.length + i + 1} />
            ))}
          </ul>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2 data-reveal="">Want a seat on the board?</h2>
          <div className="cta-side" data-reveal="" style={delay(1)}>
            <p className="page-lede">
              Elections are held every spring. Get involved this year and you’ll be ready to run.
            </p>
            <div className="actions">
              <a className="btn" href={links.discord}>Join the Discord</a>
              <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
