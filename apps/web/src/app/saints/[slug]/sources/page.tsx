import { notFound } from "next/navigation";
import {
  anthonySourceGroups,
  anthonyTheGreat,
  gabrielOfGeorgia,
  gabrielSourceGroups,
  georgeSourceGroups,
  georgeTheDragonSlayer,
  johnOfShanghaiAndSanFrancisco,
  johnSourceGroups,
  macariusSourceGroups,
  macariusTheGreat,
  mariaOfParis,
  mariaSourceGroups,
  maryOfEgypt,
  marySourceGroups,
  mosesSourceGroups,
  mosesTheBlack,
  nektariosOfAegina,
  nektariosSourceGroups,
  ninoOfGeorgia,
  ninoSourceGroups,
  saintContent,
  saints,
  seraphimOfSarov,
  seraphimSourceGroups,
  spyridonSourceGroups,
  spyridonTheWonderworker,
} from "../../../data/saints";
import { ReferenceGroup } from "@/components/saints/ReferenceGroup";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

const sourceGroupsBySlug = {
  [anthonyTheGreat.slug]: anthonySourceGroups,
  [gabrielOfGeorgia.slug]: gabrielSourceGroups,
  [georgeTheDragonSlayer.slug]: georgeSourceGroups,
  [johnOfShanghaiAndSanFrancisco.slug]: johnSourceGroups,
  [macariusTheGreat.slug]: macariusSourceGroups,
  [mariaOfParis.slug]: mariaSourceGroups,
  [maryOfEgypt.slug]: marySourceGroups,
  [mosesTheBlack.slug]: mosesSourceGroups,
  [nektariosOfAegina.slug]: nektariosSourceGroups,
  [ninoOfGeorgia.slug]: ninoSourceGroups,
  [seraphimOfSarov.slug]: seraphimSourceGroups,
  [spyridonTheWonderworker.slug]: spyridonSourceGroups,
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

export default async function DynamicSaintSourcesPage({ params }: PageProps) {
  const { slug } = await params;
  const saint = saintContent[slug];
  const sourceGroups = sourceGroupsBySlug[slug as keyof typeof sourceGroupsBySlug];

  if (!saint || !sourceGroups) {
    notFound();
  }

  return (
    <SaintPageLayout
      activeHref={`/saints/${slug}/sources`}
      saint={saint}
      title="Sources"
    >
      <Section eyebrow="Reading guide" title="Reading The Sources">
        <Prose>
          <p>
            These references introduce {saint.name} through Orthodox church
            hagiography, liturgical or devotional memory, and trusted summary
            material.
          </p>
          <p>
            Read them together as complementary witnesses: church sources give
            the primary feast and life, while contextual sources help with
            names, dates, reception, and local traditions.
          </p>
        </Prose>
      </Section>
      {sourceGroups.map((group) => (
        <ReferenceGroup group={group} key={group.title} />
      ))}
    </SaintPageLayout>
  );
}
