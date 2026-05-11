import { maryOfEgypt, maryTeachingSections } from "../../../data/saints";
import { saintSectionMetadata } from "../../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export const metadata = saintSectionMetadata(maryOfEgypt, "Teachings");

export default function MaryOfEgyptTeachingsPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/mary-of-egypt/teachings"
      saint={maryOfEgypt}
      title="Teachings"
    >
      <ResearchSectionList sections={maryTeachingSections} />
    </SaintPageLayout>
  );
}
