import {
  macariusSourceGroups,
  macariusTheGreat,
} from "../../../data/saints";
import { ReferenceGroup } from "@/components/saints/ReferenceGroup";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export default function MacariusTheGreatSourcesPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/macarius-the-great/sources"
      saint={macariusTheGreat}
      title="Sources"
    >
      <Section eyebrow="Reading guide" title="Reading The Sources">
        <Prose>
          <p>
            These references introduce Macarius the Great through Orthodox
            hagiography, liturgical commemoration, and the desert sayings
            tradition.
          </p>
          <p>
            The church sources are useful for the broad outline of his life and
            commemoration. The sayings tradition gives a closer view of the
            desert wisdom associated with Abba Macarius.
          </p>
          <p>
            Read together, they show Macarius as both a historical elder of
            Egyptian monasticism and a continuing teacher of humility, prayer,
            and discernment.
          </p>
        </Prose>
      </Section>
      {macariusSourceGroups.map((group) => (
        <ReferenceGroup group={group} key={group.title} />
      ))}
    </SaintPageLayout>
  );
}
