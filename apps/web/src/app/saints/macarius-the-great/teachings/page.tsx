import {
  macariusTeachingSections,
  macariusTheGreat,
} from "../../../data/saints";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

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
