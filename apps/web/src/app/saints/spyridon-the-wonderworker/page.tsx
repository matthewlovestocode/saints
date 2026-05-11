import {
  spyridonOverviewSections,
  spyridonTheWonderworker,
} from "../../data/saints";
import { saintMetadata } from "../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export const metadata = saintMetadata(spyridonTheWonderworker);

export default function SpyridonTheWonderworkerPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/spyridon-the-wonderworker"
      saint={spyridonTheWonderworker}
      title="Spyridon the Wonderworker"
    >
      <ResearchSectionList sections={spyridonOverviewSections} />
    </SaintPageLayout>
  );
}
