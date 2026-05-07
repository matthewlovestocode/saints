import {
  anthonyTheGreat,
  anthonyTimeline,
} from "../../../data/saints";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Timeline } from "@/components/saints/Timeline";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export default function AnthonyTheGreatLifePage() {
  return (
    <SaintPageLayout
      activeHref="/saints/anthony-the-great/life"
      saint={anthonyTheGreat}
      title="Life"
    >
      <Section eyebrow="Life" title="The Story In Brief">
        <Prose>
          <p>
            These entries sketch the remembered life of Anthony the Great as a
            father of Egyptian monasticism and a teacher of desert watchfulness.
          </p>
          <p>
            His story begins in a Christian household in Egypt, passes through
            the Gospel heard as a personal summons, and unfolds through
            renunciation, handwork, solitude, spiritual warfare, counsel, public
            witness, and final hiddenness.
          </p>
          <p>
            In Anthony, the desert becomes a place where hidden prayer forms a
            public witness for the Church: the solitary becomes a father, and
            the empty place becomes a school for others.
          </p>
        </Prose>
      </Section>
      <Timeline entries={anthonyTimeline} />
    </SaintPageLayout>
  );
}
