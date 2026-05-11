import { maryOfEgypt, maryOverviewSections } from "../../data/saints";
import { saintMetadata } from "../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export const metadata = saintMetadata(maryOfEgypt);

export default function MaryOfEgyptPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/mary-of-egypt"
      saint={maryOfEgypt}
      title="Mary of Egypt"
    >
      <ResearchSectionList sections={maryOverviewSections} />
    </SaintPageLayout>
  );
}
