import { maryOfEgypt, marySourceGroups } from "../../../data/saints";
import { saintSectionMetadata } from "../../../metadata";
import { ReferenceGroup } from "@/components/saints/ReferenceGroup";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export const metadata = saintSectionMetadata(maryOfEgypt, "Sources");

export default function MaryOfEgyptSourcesPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/mary-of-egypt/sources"
      saint={maryOfEgypt}
      title="Sources"
    >
      <Section eyebrow="Reading guide" title="Reading The Sources">
        <Prose>
          <p>
            These references introduce Saint Mary of Egypt through church
            hagiography, hymnography, and Orthodox summary material.
          </p>
          <p>
            The OCA life gives the full narrative frame through Saint Zosimas:
            the Jordan monastery, the encounter in the desert, Mary&apos;s account
            of repentance, Holy Thursday Communion, and her burial.
          </p>
          <p>
            The hymnography and secondary overview help place her in the
            Church&apos;s Lenten memory, where her life is read as a call to
            repentance and hope.
          </p>
        </Prose>
      </Section>
      {marySourceGroups.map((group) => (
        <ReferenceGroup group={group} key={group.title} />
      ))}
    </SaintPageLayout>
  );
}
