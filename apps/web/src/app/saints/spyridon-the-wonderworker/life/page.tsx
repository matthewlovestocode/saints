import {
  spyridonTheWonderworker,
  spyridonTimeline,
} from "../../../data/saints";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Timeline } from "@/components/saints/Timeline";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export default function SpyridonTheWonderworkerLifePage() {
  return (
    <SaintPageLayout
      activeHref="/saints/spyridon-the-wonderworker/life"
      saint={spyridonTheWonderworker}
      title="Life"
    >
      <Section eyebrow="Life" title="The Story In Brief">
        <Prose>
          <p>
            These entries follow Saint Spyridon from Cypriot shepherd and
            household provider to bishop, council witness, wonderworker, and
            beloved intercessor.
          </p>
          <p>
            His story is marked by an unusual union of simplicity and power:
            plain speech, practical mercy, and prayer that answers concrete
            human need.
          </p>
        </Prose>
      </Section>
      <Timeline entries={spyridonTimeline} />
    </SaintPageLayout>
  );
}
