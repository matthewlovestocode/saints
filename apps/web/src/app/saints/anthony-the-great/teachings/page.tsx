import {
  anthonyTeachingSections,
  anthonyTheGreat,
} from "../../../data/saints";
import { saintSectionMetadata } from "../../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export const metadata = saintSectionMetadata(anthonyTheGreat, "Teachings");

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
