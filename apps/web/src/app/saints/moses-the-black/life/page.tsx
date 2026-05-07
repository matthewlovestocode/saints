import { mosesTheBlack, mosesTimeline } from "../../../data/saints";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Timeline } from "@/components/saints/Timeline";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export default function MosesTheBlackLifePage() {
  return (
    <SaintPageLayout
      activeHref="/saints/moses-the-black/life"
      saint={mosesTheBlack}
      title="Life"
    >
      <Section eyebrow="Life" title="The Story In Brief">
        <Prose>
          <p>
            These entries summarize the major movement of Moses&apos; life as
            preserved across Orthodox and Coptic sources.
          </p>
          <p>
            His story is remembered through sharp contrasts: violence and mercy,
            flight and obedience, hidden struggle and public fatherhood, the
            sword of his former life and the peace of his martyrdom.
          </p>
          <p>
            The details vary by source, but the heart of the tradition is
            consistent. Moses becomes holy not by pretending his past was small,
            but by giving the whole of his life over to repentance.
          </p>
        </Prose>
      </Section>
      <Timeline entries={mosesTimeline} />
    </SaintPageLayout>
  );
}
