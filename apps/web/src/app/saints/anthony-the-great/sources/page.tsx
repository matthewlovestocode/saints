import Link from "next/link";
import { anthonySourceGroups, anthonyTheGreat } from "../../../data/saints";
import { saintSectionMetadata } from "../../../metadata";
import { ReferenceGroup } from "@/components/saints/ReferenceGroup";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export const metadata = saintSectionMetadata(anthonyTheGreat, "Sources");

export default function AnthonyTheGreatSourcesPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/anthony-the-great/sources"
      saint={anthonyTheGreat}
      title="Sources"
    >
      <Section eyebrow="Reading guide" title="Reading The Sources">
        <Prose>
          <p>
            These references introduce Anthony the Great through church
            hagiography, hymnography, and the classic Life associated with Saint
            Athanasius of Alexandria.
          </p>
          <p>
            The church sources are useful for the broad shape of his life and
            feast: his birth in Egypt, renunciation, early ascetic formation,
            battles in solitude, monastic fatherhood, visits to Alexandria, and
            final instructions.
          </p>
          <p>
            Athanasius gives the fuller early portrait that shaped later
            Christian memory of the desert. That Life is theological as well as
            biographical, presenting Anthony as a witness to Christ&apos;s victory in
            ascetic struggle.
          </p>
          <p>
            The Sayings of the Desert Fathers preserve a different kind of
            source: brief remembered words and episodes. They show Anthony
            teaching measure, humility, mercy for the fallen, prayerful reading
            of Scripture, and the surprising presence of holiness outside the
            desert.
          </p>
          <p>
            Read beside{" "}
            <Link href="/saints/macarius-the-great">Macarius</Link>, these
            sources show Anthony as both solitary ascetic and elder: hidden in
            prayer, yet deeply formative for the monks who came after him.
          </p>
        </Prose>
      </Section>
      {anthonySourceGroups.map((group) => (
        <ReferenceGroup group={group} key={group.title} />
      ))}
    </SaintPageLayout>
  );
}
