import {
  macariusOverviewSections,
  macariusTheGreat,
} from "../../data/saints";
import { saintMetadata } from "../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export const metadata = saintMetadata(macariusTheGreat);

export default function MacariusTheGreatPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/macarius-the-great"
      saint={macariusTheGreat}
      title="Macarius the Great"
    >
      <ResearchSectionList sections={macariusOverviewSections} />
    </SaintPageLayout>
  );
}
