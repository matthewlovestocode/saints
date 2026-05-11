import {
  macariusTeachingSections,
  macariusTheGreat,
} from "../../../data/saints";
import { saintSectionMetadata } from "../../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export const metadata = saintSectionMetadata(macariusTheGreat, "Teachings");

export default function MacariusTheGreatTeachingsPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/macarius-the-great/teachings"
      saint={macariusTheGreat}
      title="Teachings"
    >
      <ResearchSectionList sections={macariusTeachingSections} />
    </SaintPageLayout>
  );
}
