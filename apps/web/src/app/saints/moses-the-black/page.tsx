import {
  mosesOverviewSections,
  mosesTheBlack,
} from "../../data/saints";
import { saintMetadata } from "../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export const metadata = saintMetadata(mosesTheBlack);

export default function MosesTheBlackPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/moses-the-black"
      saint={mosesTheBlack}
      title="Moses the Black"
    >
      <ResearchSectionList sections={mosesOverviewSections} />
    </SaintPageLayout>
  );
}
