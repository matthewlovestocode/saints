import { notFound } from "next/navigation";
import {
  anthonyTheGreat,
  anthonyTimeline,
  gabrielOfGeorgia,
  gabrielTimeline,
  georgeTheDragonSlayer,
  georgeTimeline,
  johnOfShanghaiAndSanFrancisco,
  johnTimeline,
  macariusTheGreat,
  macariusTimeline,
  mariaOfParis,
  mariaTimeline,
  maryOfEgypt,
  maryTimeline,
  mosesTheBlack,
  mosesTimeline,
  nektariosOfAegina,
  nektariosTimeline,
  ninoOfGeorgia,
  ninoTimeline,
  saintContent,
  saints,
  seraphimOfSarov,
  seraphimTimeline,
  spyridonTheWonderworker,
  spyridonTimeline,
} from "../../../data/saints";
import { saintSectionMetadata } from "../../../metadata";
import { SaintPageLayout } from "@/components/saints/SaintPageLayout";
import { Timeline } from "@/components/saints/Timeline";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

const timelineBySlug = {
  [anthonyTheGreat.slug]: anthonyTimeline,
  [gabrielOfGeorgia.slug]: gabrielTimeline,
  [georgeTheDragonSlayer.slug]: georgeTimeline,
  [johnOfShanghaiAndSanFrancisco.slug]: johnTimeline,
  [macariusTheGreat.slug]: macariusTimeline,
  [mariaOfParis.slug]: mariaTimeline,
  [maryOfEgypt.slug]: maryTimeline,
  [mosesTheBlack.slug]: mosesTimeline,
  [nektariosOfAegina.slug]: nektariosTimeline,
  [ninoOfGeorgia.slug]: ninoTimeline,
  [seraphimOfSarov.slug]: seraphimTimeline,
  [spyridonTheWonderworker.slug]: spyridonTimeline,
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

  return saintSectionMetadata(saint, "Life");
}

export default async function DynamicSaintLifePage({ params }: PageProps) {
  const { slug } = await params;
  const saint = saintContent[slug];
  const entries = timelineBySlug[slug as keyof typeof timelineBySlug];

  if (!saint || !entries) {
    notFound();
  }

  return (
    <SaintPageLayout
      activeHref={`/saints/${slug}/life`}
      saint={saint}
      title="Life"
    >
      <Section eyebrow="Life" title="The Story In Brief">
        <Prose>
          <p>
            These entries trace the major movements of {saint.name}&apos;s life as
            preserved in Orthodox hagiography, liturgical memory, and trusted
            summary sources.
          </p>
          <p>
            The details are arranged as a guide for reading the saint&apos;s witness:
            formation, trial, service, and the particular shape of holiness by
            which the Church remembers this life.
          </p>
        </Prose>
      </Section>
      <Timeline entries={entries} />
    </SaintPageLayout>
  );
}
