import {
  spyridonTeachingSections,
  spyridonTheWonderworker,
} from "../../../data/saints";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

export default function SpyridonTheWonderworkerTeachingsPage() {
  return (
    <SaintPageLayout
      activeHref="/saints/spyridon-the-wonderworker/teachings"
      saint={spyridonTheWonderworker}
      title="Teachings"
    >
      <ResearchSectionList sections={spyridonTeachingSections} />
    </SaintPageLayout>
  );
}
