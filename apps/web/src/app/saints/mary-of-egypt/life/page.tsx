import { maryOfEgypt, maryTimeline } from "../../../data/saints";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Timeline } from "@/components/saints/Timeline";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export default function MaryOfEgyptLifePage() {
  return (
    <SaintPageLayout
      activeHref="/saints/mary-of-egypt/life"
      saint={maryOfEgypt}
      title="Life"
    >
      <Section eyebrow="Life" title="The Story In Brief">
        <Prose>
          <p>
            These entries follow Saint Mary from Alexandria and Jerusalem into
            the desert beyond the Jordan, where repentance became a hidden life
            of prayer and struggle.
          </p>
          <p>
            Her story is preserved through Saint Zosimas, whose encounter with
            her reveals both her humility and the unexpected radiance of hidden
            holiness.
          </p>
        </Prose>
      </Section>
      <Timeline entries={maryTimeline} />
    </SaintPageLayout>
  );
}
