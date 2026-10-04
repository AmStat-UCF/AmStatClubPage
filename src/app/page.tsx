import Link from "next/link";
import ActivitiesTable from "@/components/ActivitiesTable";
import BandCurve from "@/components/BandCurve";
import FactList from "@/components/FactList";
import LinkIndex from "@/components/LinkIndex";
import SamplingHistogram from "@/components/SamplingHistogram";
import SplitWords from "@/components/SplitWords";
import { activities, datathonFacts, linkIndex, links, meetingFacts } from "@/content/site";
import { delay } from "@/lib/motion";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1><SplitWords text="The big tent for statistics at UCF." /></h1>

          <div className="hero-grid">
            <div className="intro-seq">
              <p className="lede">
                AmStat@UCF is the University of Central Florida’s chapter of the American Statistical
                Association. We’re statisticians, data scientists, actuaries, and anyone else who likes
                statistics.
                <sup><a href="#fn1" id="fnref1" aria-label="Footnote 1">1</a></sup> Learn the tools at our
                workshops, then use them on a real project with other members.
              </p>

              <div className="actions">
                <a className="btn" href={links.discord}>Join the Discord</a>
                <a className="text-link ext" href={links.knightConnect}>Register on KnightConnect</a>
              </div>

              <FactList facts={meetingFacts} />
            </div>

            <SamplingHistogram>
              Random draws from a log-normal distribution, close to the curve in our logo. The shape is
              skewed right, so the mean ends up to the right of the median.
            </SamplingHistogram>
          </div>
        </div>
      </section>

      <section className="section" id="what-we-do">
        <div className="wrap">
          <div className="section-head" data-reveal="">
            <h2>What we do</h2>
            <p>Most of it happens at general body meetings. Announcements go out on Discord first.</p>
          </div>
          <ActivitiesTable activities={activities} />
        </div>
      </section>

      <section className="band" id="datathon" data-reveal="">
        <BandCurve />
        <div className="wrap band-grid">
          <div>
            <h2><span>AmStat</span><span className="em">Datathon</span></h2>
            <p className="blurb" data-reveal="" style={delay(2)}>
              Teams get a dataset and a deadline, then present what they found to a panel of judges.
              Dates, rules, and registration are on the datathon’s own site.
            </p>
            <div className="actions" data-reveal="" style={delay(3)}>
              <a className="btn ext" href={links.datathon}>Go to the datathon site</a>
            </div>
          </div>
          <div data-reveal="" style={delay(2)}>
            <FactList facts={datathonFacts} large />
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="wrap about-grid">
          <h2 data-reveal="">About the club</h2>
          <div className="about-body" data-reveal="" style={delay(1)}>
            <p>
              AmStat@UCF has been a registered student organization since 2023. The American Statistical
              Association calls itself the big tent for statistics, and we take that literally: you don’t
              need to be a statistics major, or any kind of math major, to join.
            </p>
            <p>
              Most of what we do points toward life after UCF. Speakers show you what the work looks like,
              workshops teach the tools, and projects give you something concrete to talk about in an
              interview.
            </p>
            <ul className="more-links">
              <li><Link href="/about">More about us</Link></li>
              <li><Link href="/officers">Meet the officers</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="links">
        <div className="wrap">
          <div className="section-head" data-reveal="">
            <h2>Links</h2>
            <p>Every form and page we use, in one place.</p>
          </div>
          <LinkIndex groups={linkIndex} />

          <aside className="footnotes" aria-label="Footnotes">
            <ol>
              <li id="fn1">
                Or is willing to be convinced. <a href="#fnref1" aria-label="Back to text">↩</a>
              </li>
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
