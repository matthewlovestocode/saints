import {
  anthonyTeachingSections,
  anthonyTheGreat,
} from "../../../data/saints";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export default function AnthonyTheGreatTeachingsPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/anthony-the-great/teachings"
      saint={anthonyTheGreat}
      title="Teachings"
    >
      <ResearchSectionList sections={anthonyTeachingSections} />
    </SaintPageLayout>
  );
}
