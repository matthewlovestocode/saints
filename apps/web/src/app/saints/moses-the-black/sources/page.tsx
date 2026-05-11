import { mosesSourceGroups, mosesTheBlack } from "../../../data/saints";
import { saintSectionMetadata } from "../../../metadata";
import { ReferenceGroup } from "@/components/saints/ReferenceGroup";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export const metadata = saintSectionMetadata(mosesTheBlack, "Sources");

export default function MosesTheBlackSourcesPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/moses-the-black/sources"
      saint={mosesTheBlack}
      title="Sources"
    >
      <Section eyebrow="Reading guide" title="Reading The Sources">
        <Prose>
          <p>
            These references include liturgical commemoration, hagiography,
            desert sayings, and modern reception. They agree on the main arc of
            Moses&apos; repentance and holiness, while preserving different details
            about dates, disciples, and individual episodes.
          </p>
          <p>
            Read together, they show both the consistency of his memory and the
            richness of the traditions that have carried it.
          </p>
          <p>
            The church sources are especially useful for the broad shape of his
            life. The sayings tradition gives a closer view of his spiritual
            counsel, especially humility, stillness, and mercy toward the
            brother who has fallen.
          </p>
          <p>
            The Coptic material also preserves details of place and memory,
            including Wadi El-Natroun and the monastery tradition connected with
            El-Baramouse.
          </p>
        </Prose>
      </Section>
      {mosesSourceGroups.map((group) => (
        <ReferenceGroup group={group} key={group.title} />
      ))}
    </SaintPageLayout>
  );
}
