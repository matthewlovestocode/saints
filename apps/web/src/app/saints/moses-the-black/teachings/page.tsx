import {
  mosesTeachingSections,
  mosesTheBlack,
} from "../../../data/saints";
import { saintSectionMetadata } from "../../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export const metadata = saintSectionMetadata(mosesTheBlack, "Teachings");

export default function MosesTheBlackTeachingsPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/moses-the-black/teachings"
      saint={mosesTheBlack}
      title="Teachings"
    >
      <ResearchSectionList sections={mosesTeachingSections} />
    </SaintPageLayout>
  );
}
