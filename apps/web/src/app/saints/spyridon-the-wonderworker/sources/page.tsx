import { spyridonSourceGroups, spyridonTheWonderworker } from "../../../data/saints";
import { ReferenceGroup } from "@/components/saints/ReferenceGroup";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export default function SpyridonTheWonderworkerSourcesPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/spyridon-the-wonderworker/sources"
      saint={spyridonTheWonderworker}
      title="Sources"
    >
      <Section eyebrow="Reading guide" title="Reading The Sources">
        <Prose>
          <p>
            These references introduce Saint Spyridon through church
            hagiography, hymnography, and a secondary Orthodox overview.
          </p>
          <p>
            The church life gives the main narrative: Cyprus, shepherding,
            episcopal service, the First Ecumenical Council, miracles of mercy,
            hospitality, and his continuing remembrance.
          </p>
          <p>
            The hymnography is useful for seeing how the Church prays his
            memory, especially his witness as a champion of truth and
            wonderworker.
          </p>
        </Prose>
      </Section>
      {spyridonSourceGroups.map((group) => (
        <ReferenceGroup group={group} key={group.title} />
      ))}
    </SaintPageLayout>
  );
}
