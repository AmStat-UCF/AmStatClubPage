import type { Metadata } from "next";
import CountUp from "@/components/CountUp";
import { delay } from "@/lib/motion";
import PageHead from "@/components/PageHead";
import { audiences, faqs, history, stats } from "@/content/about";
import { links } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who AmStat@UCF is for, how the club works, and how it got started.",
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumb="About"
        title="A home for statistics at UCF."
        lede="We started in 2024 to give students who like working with data a place to keep learning outside of class. Here’s what the club does, who it’s for, and how it began."
      />

      <section className="section">
        <div className="wrap">
          <div className="split">
            <h2 data-reveal="">What we’re for</h2>
            <div className="prose" data-reveal="" style={delay(1)}>
              <p>
                AmStat@UCF teaches practical statistics and data science, gives members real projects to
                apply it to, and connects students with people who do this work for a living.
              </p>
              <p>
                Classes cover the theory well. What they can’t always offer is time with messy data, a team
                to work through it with, and someone a few years ahead who can tell you what the job is
                actually like. That gap is what the club is built around.
              </p>
            </div>
          </div>

          <dl className="stat-strip" data-reveal="">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="label">{s.label}</dt>
                <dd className={s.placeholder ? "tbd-num" : undefined}>
                  {s.label === "Founded" ? s.value : <CountUp value={s.value} />}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal="">
            <h2>Who joins</h2>
            <p>Membership is open to every UCF student. Most people find us through one of three routes.</p>
          </div>
          <div className="who-grid" data-reveal="stagger">
            {audiences.map((a) => (
              <article key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal="">
            <h2>History</h2>
            <p>Short so far. Entries marked as placeholders are still being confirmed.</p>
          </div>
          <table className="booktabs" data-reveal="table">
            <caption><b>Table 1.</b> Club milestones by year.</caption>
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Milestone</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.year}>
                  <td className="activity"><span>{h.year}</span></td>
                  <td>{h.placeholder ? <span className="tbd">{h.event}</span> : h.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <h2 data-reveal="">Part of the ASA</h2>
          <div className="prose" data-reveal="" style={delay(1)}>
            <p>
              The American Statistical Association was founded in Boston in 1839 and is the world’s largest
              community of statisticians. It publishes journals, runs the Joint Statistical Meetings, and
              supports chapters at universities across the country.
            </p>
            <p>
              Being a chapter connects our members to that network: student competitions, conferences, and
              professionals who are usually happy to talk to students who reach out.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal="">
            <h2>Questions</h2>
            <p>The ones we get most at the start of each semester.</p>
          </div>
          <div className="faq" data-reveal="">
            {faqs.map((f) => (
              <details key={f.q} name="faq">
                <summary>{f.q}</summary>
                <p className="answer">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2 data-reveal="">Come to a meeting.</h2>
          <div className="actions" data-reveal="" style={delay(1)}>
            <a className="btn" href={links.discord}>Join the Discord</a>
            <a className="text-link ext" href={links.knightConnect}>Register on KnightConnect</a>
          </div>
        </div>
      </section>
    </>
  );
}
