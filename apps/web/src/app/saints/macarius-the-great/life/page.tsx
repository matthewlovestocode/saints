import {
  macariusTheGreat,
  macariusTimeline,
} from "../../../data/saints";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Timeline } from "@/components/saints/Timeline";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export default function MacariusTheGreatLifePage() {
  return (
    <SaintPageLayout
      activeHref="/saints/macarius-the-great/life"
      saint={macariusTheGreat}
      title="Life"
    >
      <Section eyebrow="Life" title="The Story In Brief">
        <Prose>
          <p>
            These entries sketch the remembered life of Macarius the Great as a
            desert father of Egypt and spiritual elder of Scetis.
          </p>
          <p>
            His story is less a sequence of public achievements than a desert
            witness to humility, prayer, discernment, and fatherhood.
          </p>
          <p>
            In Macarius, the desert becomes a school of hidden labor where
            holiness is slowly formed and then offered to others.
          </p>
        </Prose>
      </Section>
      <Timeline entries={macariusTimeline} />
    </SaintPageLayout>
  );
}
