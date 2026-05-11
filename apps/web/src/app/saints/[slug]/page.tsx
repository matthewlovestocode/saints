import { notFound } from "next/navigation";
import {
  anthonyOverviewSections,
  anthonyTheGreat,
  gabrielOfGeorgia,
  gabrielOverviewSections,
  georgeOverviewSections,
  georgeTheDragonSlayer,
  johnOfShanghaiAndSanFrancisco,
  johnOverviewSections,
  macariusOverviewSections,
  macariusTheGreat,
  mariaOfParis,
  mariaOverviewSections,
  maryOfEgypt,
  maryOverviewSections,
  mosesOverviewSections,
  mosesTheBlack,
  nektariosOfAegina,
  nektariosOverviewSections,
  ninoOfGeorgia,
  ninoOverviewSections,
  saintContent,
  saints,
  seraphimOfSarov,
  seraphimOverviewSections,
  spyridonOverviewSections,
  spyridonTheWonderworker,
} from "../../data/saints";
import { saintMetadata } from "../../metadata";
import { ResearchSectionList } from "@/components/saints/ResearchSectionList";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";

const overviewBySlug = {
  [anthonyTheGreat.slug]: anthonyOverviewSections,
  [gabrielOfGeorgia.slug]: gabrielOverviewSections,
  [georgeTheDragonSlayer.slug]: georgeOverviewSections,
  [johnOfShanghaiAndSanFrancisco.slug]: johnOverviewSections,
  [macariusTheGreat.slug]: macariusOverviewSections,
  [mariaOfParis.slug]: mariaOverviewSections,
  [maryOfEgypt.slug]: maryOverviewSections,
  [mosesTheBlack.slug]: mosesOverviewSections,
  [nektariosOfAegina.slug]: nektariosOverviewSections,
  [ninoOfGeorgia.slug]: ninoOverviewSections,
  [seraphimOfSarov.slug]: seraphimOverviewSections,
  [spyridonTheWonderworker.slug]: spyridonOverviewSections,
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

  return saintMetadata(saint);
}

export default async function DynamicSaintPage({ params }: PageProps) {
  const { slug } = await params;
  const saint = saintContent[slug];
  const sections = overviewBySlug[slug as keyof typeof overviewBySlug];

  if (!saint || !sections) {
    notFound();
  }

  return (
    <SaintPageLayout
      activeHref={`/saints/${slug}`}
      saint={saint}
      title={saint.name}
    >
      <ResearchSectionList sections={sections} />
    </SaintPageLayout>
  );
}
