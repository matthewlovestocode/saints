import { notFound } from "next/navigation";
import {
  anthonyTeachingSections,
  anthonyTheGreat,
  gabrielOfGeorgia,
  gabrielTeachingSections,
  georgeTeachingSections,
  georgeTheDragonSlayer,
  johnOfShanghaiAndSanFrancisco,
  johnTeachingSections,
  macariusTeachingSections,
  macariusTheGreat,
  mariaOfParis,
  mariaTeachingSections,
  maryOfEgypt,
  maryTeachingSections,
  mosesTeachingSections,
  mosesTheBlack,
  nektariosOfAegina,
  nektariosTeachingSections,
  ninoOfGeorgia,
  ninoTeachingSections,
  saintContent,
  saints,
  seraphimOfSarov,
  seraphimTeachingSections,
  spyridonTeachingSections,
  spyridonTheWonderworker,
} from "../../../data/saints";
import { saintSectionMetadata } from "../../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

const teachingsBySlug = {
  [anthonyTheGreat.slug]: anthonyTeachingSections,
  [gabrielOfGeorgia.slug]: gabrielTeachingSections,
  [georgeTheDragonSlayer.slug]: georgeTeachingSections,
  [johnOfShanghaiAndSanFrancisco.slug]: johnTeachingSections,
  [macariusTheGreat.slug]: macariusTeachingSections,
  [mariaOfParis.slug]: mariaTeachingSections,
  [maryOfEgypt.slug]: maryTeachingSections,
  [mosesTheBlack.slug]: mosesTeachingSections,
  [nektariosOfAegina.slug]: nektariosTeachingSections,
  [ninoOfGeorgia.slug]: ninoTeachingSections,
  [seraphimOfSarov.slug]: seraphimTeachingSections,
  [spyridonTheWonderworker.slug]: spyridonTeachingSections,
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return saints.map((saint) => ({
    slug: saint.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const saint = saintContent[slug];

  if (!saint) {
    return {};
  }

  return saintSectionMetadata(saint, "Teachings");
}

export default async function DynamicSaintTeachingsPage({ params }: PageProps) {
  const { slug } = await params;
  const saint = saintContent[slug];
  const sections = teachingsBySlug[slug as keyof typeof teachingsBySlug];

  if (!saint || !sections) {
    notFound();
  }

  return (
    <SaintPageLayout
      activeHref={`/saints/${slug}/teachings`}
      saint={saint}
      title="Teachings"
    >
      <ResearchSectionList sections={sections} />
    </SaintPageLayout>
  );
}
