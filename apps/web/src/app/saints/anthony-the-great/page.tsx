import {
  anthonyOverviewSections,
  anthonyTheGreat,
} from "../../data/saints";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export default function AnthonyTheGreatPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/anthony-the-great"
      saint={anthonyTheGreat}
      title="Anthony the Great"
    >
      <ResearchSectionList sections={anthonyOverviewSections} />
    </SaintPageLayout>
  );
}
