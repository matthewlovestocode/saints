export type Reference = {
  id: string;
  note: string;
  publisher: string;
  title: string;
  url: string;
};

export type SaintPage = {
  title: string;
  href: string;
  description: string;
};

export type Saint = {
  name: string;
  slug: string;
  titles: string[];
  feastDay: string;
  period: string;
  location: string;
  summary: string;
  image: string;
  facts: Array<{ label: string; value: string }>;
  pages: SaintPage[];
};

export type ResearchSection = {
  body: ProseBlock[];
  bullets?: string[];
  eyebrow?: string;
  image?: {
    alt: string;
    caption?: string;
    height: number;
    src: string;
    width: number;
  };
  references: string[];
  title: string;
};

export type TimelineEntry = {
  body: ProseBlock[];
  image?: {
    alt: string;
    caption?: string;
    height: number;
    src: string;
    width: number;
  };
  label: string;
  references: string[];
  title: string;
};

export type ProseBlock =
  | string
  | Array<
      | string
      | {
          href: string;
          text: string;
        }
    >;

export const references: Record<string, Reference> = {
  "oca-life": {
    id: "oca-life",
    title: "OCA Life",
    publisher: "Orthodox Church in America",
    url: "https://www.oca.org/saints/lives/2023/08/28/102414-venerable-moses-the-ethiopian-of-scete",
    note: "Eastern Orthodox life of Venerable Moses the Ethiopian of Scete, including his feast day, repentance, ascetic struggle, ordination, disciples, and death.",
  },
  "oca-hymns": {
    id: "oca-hymns",
    title: "OCA Hymns",
    publisher: "Orthodox Church in America",
    url: "https://www.oca.org/saints/troparia/1985/08/28/102414-venerable-moses-the-ethiopian-of-scete",
    note: "Troparia and kontakia for Saint Moses, showing how the Church remembers him in prayer.",
  },
  antioch: {
    id: "antioch",
    title: "Antioch Synaxarion",
    publisher: "Greek Orthodox Patriarchate of Antioch and All the East",
    url: "https://antiochpatriarchate.org/en/page/saint-moses-the-black-of-scete/712/",
    note: "A concise Orthodox synaxarion entry emphasizing repentance, humility, the basket of sand, and his voluntary martyrdom.",
  },
  "st-takla": {
    id: "st-takla",
    title: "Coptic Synaxarium",
    publisher: "St-Takla.org",
    url: "https://st-takla.org/books/en/church/synaxarium/10-bawoonah/24-paona-moses.html",
    note: "Coptic Synaxarium entry for the martyrdom of Anba Moses the Black on 24 Paonah, with details about Wadi El-Natroun, Isidore, Macarius, and El-Baramouse.",
  },
  sayings: {
    id: "sayings",
    title: "Desert Fathers",
    publisher: "The Sayings of the Desert Fathers, translated by Benedicta Ward",
    url: "https://stmichaeltravis.org/wp-content/uploads/2023/02/Sayings-of-the-Desert-Fathers-Alphabetical.pdf",
    note: "An accessible PDF of the Alphabetical Collection, including sayings attributed to Abba Moses and broader desert-monastic context.",
  },
  orthodoxwiki: {
    id: "orthodoxwiki",
    title: "OrthodoxWiki",
    publisher: "OrthodoxWiki",
    url: "https://en.orthodoxwiki.org/index.php?title=Moses_the_Black",
    note: "Secondary overview with an explicit note that the article reflects an Oriental Orthodox perspective.",
  },
  fellowship: {
    id: "fellowship",
    title: "Fellowship Life",
    publisher: "Fellowship of St. Moses the Black",
    url: "https://mosestheblack.org/resources/life/",
    note: "A modern Orthodox life of Saint Moses with expanded narrative details, including the shepherd by the Nile, the two sheep, and later monastic stories.",
  },
  "macarius-oca-life": {
    id: "macarius-oca-life",
    title: "OCA Life",
    publisher: "Orthodox Church in America",
    url: "https://www.oca.org/saints/lives/2024/01/19/100226-venerable-macarius-the-great-of-egypt",
    note: "Eastern Orthodox life of Venerable Macarius the Great of Egypt, including his early trials, entrance into monastic life, miracles, and death.",
  },
  "macarius-oca-hymns": {
    id: "macarius-oca-hymns",
    title: "OCA Hymns",
    publisher: "Orthodox Church in America",
    url: "https://www.oca.org/saints/troparia/2024/01/19/100226-venerable-macarius-the-great-of-egypt",
    note: "Troparion and kontakion for Saint Macarius, including the liturgical title Father of Fathers.",
  },
  "macarius-orthodoxwiki": {
    id: "macarius-orthodoxwiki",
    title: "OrthodoxWiki",
    publisher: "OrthodoxWiki",
    url: "https://orthodoxwiki.org/Macarius_the_Great",
    note: "Secondary overview of Saint Macarius the Great, his monastic setting, feast day, and remembered sayings.",
  },
  "palladius-lausiac": {
    id: "palladius-lausiac",
    title: "Lausiac History",
    publisher: "Palladius of Galatia, English translation hosted by Tertullian.org",
    url: "https://www.tertullian.org/fathers/palladius_lausiac_02_text.htm",
    note: "Early monastic source preserving stories of Egyptian desert elders, including accounts associated with Macarius of Egypt and the Scetis tradition.",
  },
};

export function getReferences(ids: string[]) {
  return ids.map((id) => references[id]);
}

export const saints: Saint[] = [
  {
    name: "Moses the Black",
    slug: "moses-the-black",
    titles: [
      "Abba Moses",
      "Moses the Ethiopian",
      "Moses the Strong",
      "Moses the Robber",
    ],
    feastDay: "August 28",
    period: "4th century; traditional dates c. 330-c. 405",
    location: "Scetis, Egypt; Wadi El-Natroun",
    summary:
      "A desert father whose remembered life moves from violence and robbery to repentance, monastic discipline, humility, hospitality, priesthood, and martyrdom.",
    image: "/images/moses-the-black.png",
    facts: [
      { label: "Commemoration", value: "August 28" },
      { label: "Tradition", value: "Desert Father of Scetis" },
      { label: "Place", value: "Egyptian desert" },
    ],
    pages: [
      {
        title: "Overview",
        href: "/saints/moses-the-black",
        description: "A researched introduction to Saint Moses the Black.",
      },
      {
        title: "Life",
        href: "/saints/moses-the-black/life",
        description: "His conversion, monastic struggle, and martyrdom.",
      },
      {
        title: "Teachings",
        href: "/saints/moses-the-black/teachings",
        description: "Themes and sayings associated with Abba Moses.",
      },
      {
        title: "Sources",
        href: "/saints/moses-the-black/sources",
        description: "Primary references for further reading.",
      },
    ],
  },
  {
    name: "Macarius the Great",
    slug: "macarius-the-great",
    titles: [
      "Macarius of Egypt",
      "Macarius the Elder",
      "Lamp of the Desert",
      "Father of Fathers",
    ],
    feastDay: "January 19",
    period: "4th century; traditional dates c. 300-c. 391",
    location: "Scetis, Egypt",
    summary:
      "A foundational desert father of Egypt whose life is remembered for humility, discernment, prayer, wonderworking, and spiritual fatherhood in Scetis.",
    image: "/images/macarius-the-great.png",
    facts: [
      { label: "Commemoration", value: "January 19" },
      { label: "Tradition", value: "Desert Father of Scetis" },
      { label: "Place", value: "Egyptian desert" },
    ],
    pages: [
      {
        title: "Overview",
        href: "/saints/macarius-the-great",
        description: "A researched introduction to Saint Macarius the Great.",
      },
      {
        title: "Life",
        href: "/saints/macarius-the-great/life",
        description: "His trials, monastic formation, and spiritual fatherhood.",
      },
      {
        title: "Teachings",
        href: "/saints/macarius-the-great/teachings",
        description: "Themes and sayings associated with Abba Macarius.",
      },
      {
        title: "Sources",
        href: "/saints/macarius-the-great/sources",
        description: "Primary references for further reading.",
      },
    ],
  },
];

export const mosesTheBlack = saints[0];
export const macariusTheGreat = saints[1];

export const mosesOverviewSections: ResearchSection[] = [
  {
    eyebrow: "Repentance",
    title: "A Witness To Repentance",
    body: [
      "Moses the Black is remembered as a dramatic witness to repentance. Orthodox sources do not present him as naturally gentle or already holy; they present a feared man who became a monk, a spiritual father, and a model of humility.",
      "His life is not only a sequence of dates and facts, but the story of a soul turned toward God through struggle, obedience, prayer, and mercy.",
      "The force of his story is that holiness is not shown as forgetfulness of the past. Moses carries the memory of what he had been, and that memory becomes a reason for humility rather than despair.",
      "For that reason, he is often loved by people who need to hear that repentance is not a thin religious idea. In Moses, repentance becomes a visible way of life: confession, fasting, prayer, service, restraint from judgment, and courage at the hour of death.",
    ],
    references: ["oca-life", "antioch", "st-takla"],
  },
  {
    eyebrow: "Names",
    title: "How The Sources Name Him",
    body: [
      "The Eastern Orthodox entry from the OCA calls him Venerable Moses the Ethiopian of Scete and explains the epithet Murin in connection with his Ethiopian identity. Other sources call him Moses the Black, Moses the Strong, Abba Moses, and Moses the Robber.",
      "The title Moses the Black belongs to the historical and hagiographic tradition around him. The sources connect it both to ethnic description and to the remembered contrast between his former life and repentance.",
      "Abba means father, and in the desert tradition it is a title of spiritual maturity. The same man remembered for robbery is also remembered as a father of monks, showing how completely his life was reoriented.",
      "The different names are not merely alternate labels. They gather several memories into one person: an Ethiopian monk, a strong man, a penitent sinner, a priest, a martyr, and a guide for those learning humility.",
    ],
    references: ["oca-life", "orthodoxwiki", "antioch"],
  },
  {
    eyebrow: "Source note",
    title: "Source Traditions Vary In Detail",
    body: [
      "The sources agree on the broad arc: Moses was associated with violence and robbery, repented, entered monastic life in Scetis, became known for humility, and died during an attack. They differ in some details, such as exact dates, the number of disciples, and the phrasing of particular stories.",
      "Those variations are part of how his memory has been received across the Church, especially when Eastern Orthodox and Coptic Synaxarium material are read side by side.",
      "Some accounts emphasize his spiritual struggle after conversion, especially the long battle against old habits. Others give more attention to his ordination, his disciples, or the circumstances of his martyrdom.",
      "Read together, the traditions present a fuller image: Moses is not a flat moral example, but a desert father whose life was remembered in prayer, monastic teaching, local memory, and written hagiography.",
    ],
    references: ["oca-life", "st-takla", "orthodoxwiki"],
  },
];

export const mosesTimeline: TimelineEntry[] = [
  {
    label: "Early life",
    title: "A Feared Former Life",
    body: [
      "The tradition remembers Moses as enslaved in youth, dismissed by his master, and later feared as a violent robber. The story begins with an intentionally stark picture of sin, strength, and notoriety.",
      "One remembered story tells of a shepherd who had offended him. Moses recognized the man from across the Nile and crossed the water to find him. The shepherd, terrified by Moses' approach, abandoned his flock and hid by burying himself in the sand.",
      "When Moses could not find the man, he took two of the sheep instead. The story is severe, but it shows why people fled at the sight of him and why his later repentance was remembered with such force.",
      "This beginning matters because the sources do not soften the darkness around him. Moses is not introduced as a misunderstood hero, but as a man who had become dangerous to others and deeply wounded in his own soul.",
      "His physical strength, which had once been joined to violence, later becomes part of the story of his endurance in ascetic life. The same intensity that made him feared is slowly redirected toward repentance.",
    ],
    image: {
      alt: "Icon-inspired image of younger Moses the Black taking two sheep while a frightened shepherd hides in the sand",
      caption:
        "A remembered scene from Moses' former life: the shepherd hides in the sand while Moses takes two sheep from the flock.",
      height: 1536,
      src: "/images/moses-the-robber-sheep.png",
      width: 1024,
    },
    references: ["oca-life", "antioch", "st-takla", "fellowship"],
  },
  {
    label: "Conversion",
    title: "Turning Toward The Desert",
    body: [
      [
        "After repentance, Moses sought admission to a desert monastery. The Coptic Synaxarium emphasizes Wadi El-Natroun and says he was brought by Isidore to ",
        {
          href: "/saints/macarius-the-great",
          text: "Macarius the Great",
        },
        ", who taught and baptized him.",
      ],
      "The movement into the desert was not an escape into privacy. In the monastic world of Scetis, Moses came under obedience, learned prayer, and accepted the discipline of elders who knew the life he was seeking.",
      "His conversion is remembered as both decisive and costly. He turns toward God, but the sources also show that old passions do not disappear simply because he has entered the monastery.",
    ],
    image: {
      alt: "Icon-inspired image of younger Moses the Black walking toward a desert monastery where an elder monk receives him",
      caption:
        "Moses turns toward the desert monastery, where the elders begin to receive him into repentance and obedience.",
      height: 1536,
      src: "/images/moses-turning-toward-desert.png",
      width: 1024,
    },
    references: ["oca-life", "st-takla"],
  },
  {
    label: "Discipline",
    title: "The Long Struggle",
    body: [
      "The OCA account stresses that Moses was not immediately free from the passions. Abba Isidore counseled him in fasting, vigil, prayer, and perseverance, while Moses also served the other monks by carrying water at night.",
      "This part of his life is especially important because it refuses a simple before-and-after story. Moses repents, but then he must learn how to live as a penitent man day after day.",
      "His hidden service to the brethren shows repentance taking practical form. Carrying water at night is a small, bodily act, but in the tradition it becomes a sign that humility had begun to reshape his strength.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Moses the Black carrying water at night during his long ascetic struggle",
      caption:
        "Moses carries water at night for the brothers, a hidden act of service within the long work of repentance.",
      height: 1536,
      src: "/images/moses-long-struggle.png",
      width: 1024,
    },
    references: ["oca-life", "st-takla"],
  },
  {
    label: "Humility",
    title: "The Basket Of Sand",
    body: [
      "One of the best-known stories says that when asked to judge a brother, Moses came carrying a leaking basket of sand as an image of his own sins. The lesson is not passivity, but humility before condemnation.",
      "The image is simple and severe: his sins are falling behind him, and he does not fully see them, yet he has been asked to examine another person. Moses answers the situation with a living parable instead of an argument.",
      "This story is one reason he is remembered not only as a penitent, but as a teacher of mercy. His authority comes from self-knowledge, not from eagerness to correct others.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Moses the Black carrying a basket of sand that spills behind him",
      caption:
        "Moses carries a leaking basket of sand as an image of the sins he cannot fully see behind him.",
      height: 1536,
      src: "/images/moses-basket-of-sand.png",
      width: 1024,
    },
    references: ["antioch", "sayings"],
  },
  {
    label: "Priesthood",
    title: "A Spiritual Father",
    body: [
      "Sources remember Moses as ordained and revered for virtue. The OCA account says he labored as a priest for fifteen years and gathered seventy-five disciples; the Coptic Synaxarium remembers him as a spiritual guide to five hundred brothers.",
      "The remembered numbers vary, but the meaning is consistent: Moses became a father to others. His past did not prevent him from becoming a guide; rather, his repentance became part of the wisdom by which he guided.",
      "His priesthood also deepens the contrast at the heart of his life. The hands once associated with violence become hands of blessing, service, and prayer within the desert community.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Moses the Black teaching and blessing younger monks as a spiritual father",
      caption:
        "Moses is remembered as a priest and spiritual father, guiding brothers in the desert through repentance, blessing, and prayer.",
      height: 1536,
      src: "/images/moses-spiritual-father.png",
      width: 1024,
    },
    references: ["oca-life", "st-takla"],
  },
  {
    label: "Martyrdom",
    title: "Remaining At Scetis",
    body: [
      "Near the end of his life, Moses warned the brothers of an attack and blessed those who wished to flee. He remained and was killed with other monks, interpreting his death through Christ's warning that those who take the sword perish by the sword.",
      "The tradition presents this death as a final act of repentance and peace. Moses does not meet violence with violence, even though violence had once defined his life.",
      "His martyrdom completes the arc remembered by the Church: the robber becomes monk, the monk becomes father, and the father remains in peace when death comes to the monastery.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Moses the Black blessing monks at Scetis before his martyrdom",
      caption:
        "Moses remains at Scetis in peace, blessing the brothers and refusing to meet the coming violence with violence.",
      height: 1536,
      src: "/images/moses-remaining-at-scetis.png",
      width: 1024,
    },
    references: ["oca-life", "antioch", "st-takla"],
  },
];

export const mosesTeachingSections: ResearchSection[] = [
  {
    eyebrow: "Repentance",
    title: "Repentance Becomes A Whole Life",
    body: [
      "The accounts of Moses do not treat repentance as a single emotional moment. His conversion opens into obedience, tears, fasting, vigil, confession of struggle, and service to the brethren.",
      "His holiness is shown through a long reordering of the person, not a polished origin story. He remains a man in battle, but his battle is now fought under obedience and with hope.",
      "This is why his life speaks so strongly to those who feel trapped by the memory of serious sin. Moses does not deny the past, but neither does he allow the past to have the final word.",
      "In him, repentance becomes steady movement: turning, falling, rising, confessing, serving, and remaining before God.",
    ],
    references: ["oca-life", "st-takla"],
  },
  {
    eyebrow: "Humility",
    title: "Refusing To Judge Another Brother",
    body: [
      "The basket of sand story is central to Moses' remembered teaching. When others wanted him to judge a brother, he made his own sins visible as the first matter requiring attention.",
      "The image joins memory, confession, and mercy in one concrete act.",
      "Moses does not excuse sin. Instead, he places judgment under the fear of God and the knowledge of his own need for mercy.",
      "His humility is therefore strong, not evasive. It teaches that clear sight begins with repentance in the heart of the one who sees.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Moses the Black carrying a basket of sand that spills behind him",
      caption:
        "Saint Moses carrying the basket of sand, a remembered image of his refusal to condemn a brother while his own sins fell behind him unseen.",
      height: 1536,
      src: "/images/moses-basket-of-sand.png",
      width: 1024,
    },
    references: ["antioch", "sayings"],
  },
  {
    eyebrow: "Hiddenness",
    title: "Fleeing The Praise Of The Powerful",
    body: [
      "Another story remembers a powerful visitor, sometimes described as an imperial official or prince, coming into the desert to see Moses with gifts and attendants. Moses did not welcome the attention as a useful opportunity for reputation.",
      "When he learned that the visitor was coming, he fled. On the road, the party unknowingly met Moses himself and asked where to find his cell. Moses answered by warning them away from the monk they sought, describing him as foolish and unworthy.",
      "Only afterward did the brothers recognize from the visitor's description that the stranger on the road had been Moses. The visitor returned home spiritually helped, not because Moses had displayed greatness, but because he had hidden from it.",
    ],
    references: ["fellowship"],
  },
  {
    eyebrow: "Prayer",
    title: "The Cell As Teacher",
    body: [
      "The desert tradition preserves the short counsel associated with Abba Moses: go sit in your cell, and the cell will teach you. In context, this is not isolation for its own sake, but the refusal to flee the place where repentance must become real.",
      "For Moses, the cell is paired with accountability to Abba Isidore and concrete service to others. Solitude and obedience belong together.",
      "The cell strips away performance. It leaves the monk with his thoughts, his temptations, his prayers, and the presence of God.",
      "Moses' own life gives weight to this counsel because he knew the impulse to run from inner conflict. The desert does not erase conflict, but it becomes the place where conflict can be offered to God.",
    ],
    references: ["sayings"],
  },
  {
    eyebrow: "Hospitality",
    title: "Austere, But Not Cold",
    body: [
      "The Desert Fathers material remembers Moses as hospitable, not merely severe. The broader tradition contrasts different holy temperaments in the desert: silence and solitude are honored, but so is receiving a visitor with warmth.",
      "The mature Moses is remembered as humble, disciplined, and open-handed.",
      "This hospitality is not sentimental. It flows from repentance, because a man who has received mercy learns to receive others without contempt.",
      "In Moses, asceticism and tenderness belong together. His discipline does not close him off from his brothers; it makes him more able to serve them.",
    ],
    references: ["sayings"],
  },
];

export const mosesSourceGroups = [
  {
    title: "Church And Synaxarion Sources",
    references: ["oca-life", "oca-hymns", "antioch", "st-takla"],
  },
  {
    title: "Sayings And Desert Tradition",
    references: ["sayings"],
  },
  {
    title: "Context And Modern Reception",
    references: ["orthodoxwiki", "fellowship"],
  },
];

export const macariusOverviewSections: ResearchSection[] = [
  {
    eyebrow: "Desert father",
    title: "A Father Of Scetis",
    body: [
      "Macarius the Great is one of the central fathers of Egyptian monasticism. The OCA life remembers him as an Egyptian ascetic who became a spiritual elder in Scetis, the desert region whose name later becomes inseparable from the great sayings tradition.",
      "His life is not remembered as a smooth rise to religious honor. The stories around him begin with loss, unwanted attention, false accusation, and flight into deeper solitude.",
      "The title Father of Fathers fits him because his fatherhood is not administrative first. It grows from a life tested in humiliation, prayer, discernment, and hidden labor.",
      "Macarius stands close to the world of Moses the Black: both belong to Scetis, both are remembered through terse desert wisdom, and both teach that holiness is formed through repentance rather than reputation.",
    ],
    references: ["macarius-oca-life", "macarius-orthodoxwiki"],
  },
  {
    eyebrow: "Names",
    title: "Macarius Of Egypt",
    body: [
      "The sources call him Macarius the Great, Macarius of Egypt, and Macarius the Elder. These names distinguish him from Macarius of Alexandria, another important desert father from the same wider Egyptian monastic world.",
      "The OCA hymnography calls him Father of Fathers, a liturgical title that gathers his place among the elders of the desert into a single phrase.",
      "OrthodoxWiki also preserves the title Lamp of the Desert, which points to how later memory sees him: not as a public organizer first, but as a light formed in hidden ascetic life.",
      "His name means blessed. In his life, that blessedness is not easy fortune; it is the strange blessing of being made humble, watchful, and merciful through the desert.",
    ],
    references: ["macarius-oca-hymns", "macarius-orthodoxwiki"],
  },
  {
    eyebrow: "Sources",
    title: "Story, Saying, And Memory",
    body: [
      "The main shape of Macarius' life comes through church hagiography, liturgical commemoration, and the sayings tradition. Each source emphasizes a different part of his memory.",
      "The OCA life gives a fuller narrative: his early marriage and widowhood, his unwanted ordination, the accusation against him, his withdrawal into the desert, his relationship with Saint Anthony, and the miracles and trials attached to his old age.",
      "The Sayings of the Desert Fathers preserve a different kind of truth: short remembered encounters that show how Macarius answered temptation, criticism, demonic harassment, and the needs of brothers.",
      "Read together, the sources give a portrait of a man who became great by refusing to be impressive.",
    ],
    references: ["macarius-oca-life", "sayings", "palladius-lausiac"],
  },
];

export const macariusTimeline: TimelineEntry[] = [
  {
    label: "Early life",
    title: "Widowhood And Hidden Desire",
    body: [
      "The OCA life remembers Macarius as born in Egypt around the beginning of the fourth century. Some traditions name his village as Ptinapor, while other Coptic-influenced summaries associate him with Shabsheer in the Menuf region.",
      "His parents arranged a marriage for him, but his wife died while still young. In the tradition, this grief becomes one of the first openings through which Macarius turns more completely toward prayer.",
      "Macarius cared for his aged parents and learned Scripture, fasting, watchfulness, and manual labor from an elder. Basket weaving enters the story early, not as background color, but as part of the desert pattern of prayer joined to work.",
      "After his parents died, he gave away what remained to him and moved toward the ascetic life he had long desired. Even here, the tradition does not present him as self-invented; he is formed through obedience, counsel, grief, and patient labor.",
    ],
    image: {
      alt: "Icon-inspired image of young Saint Macarius praying near a village memorial lamp and basket reeds",
      caption:
        "Young Macarius turns toward prayer and ascetic life after grief, counsel, and the first lessons of hidden labor.",
      height: 1536,
      src: "/images/macarius-widowhood-hidden-desire.png",
      width: 1024,
    },
    references: ["macarius-oca-life"],
  },
  {
    label: "Village",
    title: "Ordained Against His Will",
    body: [
      "The people of the village saw his seriousness and wanted him set apart for church service. The OCA life says the local bishop ordained him to the diaconate, while other summaries speak more broadly of ordination.",
      "Macarius was distressed because public honor disturbed the silence he sought. He withdrew and settled elsewhere, preferring the quiet of a small cell to the praise of the village.",
      "There he continued the ordinary desert work of making baskets. Prayer, silence, and manual labor are not separate compartments in his story; they become one way of standing before God.",
      "This episode establishes one of Macarius' repeated instincts: he flees honor before honor can possess him. Public usefulness is not denied, but it is never allowed to become the center of his identity.",
    ],
    image: {
      alt: "Icon-inspired image of a bishop blessing reluctant young Saint Macarius near a village church",
      caption:
        "Macarius receives church service reluctantly, already longing for the silence of the desert cell.",
      height: 1536,
      src: "/images/macarius-ordained-against-his-will.png",
      width: 1024,
    },
    references: ["macarius-oca-life"],
  },
  {
    label: "Trial",
    title: "False Accusation And Humility",
    body: [
      "One of the most important stories in his life is the false accusation made against him by a young woman who became pregnant and named Macarius as the father.",
      "Macarius did not defend himself with outrage. The OCA account says he accepted the shame and worked harder to provide for the woman, even though the accusation was false.",
      "The story remembers the villagers shaming him and Macarius answering by increasing his labor. He sends the earnings from his baskets for the woman and child he is accused of fathering.",
      "When the truth was revealed, the village wanted to honor him. Macarius fled by night into the desert instead.",
      "His entrance into deeper solitude is therefore linked not only to ascetic longing, but to the refusal to be built up by praise after surviving dishonor.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Macarius carrying baskets while villagers accuse him",
      caption:
        "Under false accusation, Macarius keeps silence and works, turning shame into hidden labor.",
      height: 1536,
      src: "/images/macarius-false-accusation.png",
      width: 1024,
    },
    references: ["macarius-oca-life"],
  },
  {
    label: "Anthony",
    title: "Tested By Saint Anthony",
    body: [
      "After time in the desert, Macarius later visited Saint Anthony the Great, whose place in Egyptian monasticism gave him the authority of a father among fathers.",
      "The OCA life remembers Anthony testing him with the work of soaking and plaiting palm branches. When Macarius endured the labor without complaint, Anthony recognized the grace at work in him.",
      "Anthony's test is not a puzzle or a spectacle. It is a desert way of seeing whether patience, obedience, and perseverance have entered the body as well as the mind.",
      "This encounter places Macarius inside the living chain of desert formation: elders test younger monks, not to humiliate them for sport, but to reveal whether obedience and perseverance have become real.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Anthony testing and blessing Saint Macarius with palm branches nearby",
      caption:
        "Saint Anthony tests Macarius through humble work and recognizes the grace of perseverance in him.",
      height: 1536,
      src: "/images/macarius-tested-by-anthony.png",
      width: 1024,
    },
    references: ["macarius-oca-life"],
  },
  {
    label: "Scetis",
    title: "The Young Elder",
    body: [
      "Macarius became associated with Scetis, the desert region that became one of the great centers of Egyptian monasticism. The sources remember him as a father in the same desert world that later shapes Moses the Black.",
      "He was eventually called a young elder. The phrase catches the paradox of his life: he was not yet old, but the desert recognized spiritual maturity in him.",
      "The OCA account remembers that he was ordained priest for the monks and that many came to him for counsel, confession, healing, and prayer.",
      "Stories also remember the hidden intensity of his life, including a place of deeper withdrawal connected with his cell. His fatherhood grows from this hiddenness: people come because the desert has made him trustworthy.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Macarius receiving monks at Scetis near his cell and prayer cave",
      caption:
        "At Scetis, Macarius becomes the young elder: a priest and father formed by hidden prayer.",
      height: 1536,
      src: "/images/macarius-young-elder.png",
      width: 1024,
    },
    references: ["macarius-oca-life", "macarius-orthodoxwiki"],
  },
  {
    label: "Mercy",
    title: "Helping The Thief",
    body: [
      "One of the clearest stories of Macarius' mercy says that he returned to his cell and found a thief loading his belongings onto an animal.",
      "Rather than exposing the thief, Macarius helped him finish loading the goods. The story is startling because Macarius treats even the loss of possessions as a place to practice freedom.",
      "This is not indifference to evil. It is the desert logic of non-possession: the monk owns nothing so tightly that mercy must be abandoned to defend it.",
      "The story also keeps Macarius from becoming merely severe. His asceticism is sharp, but it is joined to compassion and self-emptying.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Macarius helping a thief load stolen goods onto a donkey",
      caption:
        "Macarius helps load his own stolen goods, a remembered sign of radical non-possession and mercy.",
      height: 1536,
      src: "/images/macarius-helping-thief.png",
      width: 1024,
    },
    references: ["macarius-oca-life", "sayings"],
  },
  {
    label: "Intercession",
    title: "The Skull In The Desert",
    body: [
      "Another severe story tells of Macarius finding a skull in the desert. Through prayer, he learns of the suffering of those separated from God.",
      "The point of the story is not fascination with the dead. Macarius listens, prays, and weeps; the scene becomes an image of intercession.",
      "Even here, the desert tradition holds mercy and judgment together. The elder is not entertained by spiritual realities; he is moved to compassion by them.",
      "For that reason, the skull story belongs in Macarius' life as a witness to prayer for all, including those who seem farthest away.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Macarius praying beside a skull in the desert",
      caption:
        "Macarius prays beside the skull in the desert, a severe story remembered as intercession rather than spectacle.",
      height: 1536,
      src: "/images/macarius-skull-in-desert.png",
      width: 1024,
    },
    references: ["macarius-oca-life", "sayings"],
  },
  {
    label: "Persecution",
    title: "Exile Under Arian Pressure",
    body: [
      "Late in life, Macarius suffered exile during the Arian conflicts that troubled the Church in Egypt. The OCA life connects this suffering with the reign of Emperor Valens and the pressure of the Arian bishop Lucius.",
      "Macarius was sent away with Macarius of Alexandria to an island where pagan inhabitants lived.",
      "Even in exile, the story says, God worked through him. The healing of a pagan priest's daughter leads the islanders toward baptism and the Christian faith.",
      "This episode broadens the picture of Macarius beyond the solitary cell. The desert elder is also caught up in the doctrinal struggles of the fourth-century Church.",
    ],
    image: {
      alt: "Icon-inspired image of Saint Macarius the Great and Macarius of Alexandria in a boat approaching exile",
      caption:
        "The two Macarii are sent into exile, where the tradition remembers healing and baptism on the island.",
      height: 1536,
      src: "/images/macarius-exile-arian-pressure.png",
      width: 1024,
    },
    references: ["macarius-oca-life"],
  },
  {
    label: "Repose",
    title: "A Father Remembered",
    body: [
      "Macarius is traditionally said to have reposed around the end of the fourth century, after decades in the desert. The OCA life remembers him as reaching ninety years of age, with sixty years spent in the wilderness.",
      "Near his death, the tradition says that Saints Anthony and Pachomius appeared to him, and that Macarius instructed the brothers to preserve the monastic rule and traditions he had received.",
      "His final prayer is remembered in the words of Christ: into Thy hands I commend my spirit. The story closes as it began, with surrender rather than self-display.",
      "The Church commemorates him on January 19 and remembers him as Father of Fathers, a title that names the mature spiritual fatherhood formed through hidden life.",
      "In the broader story of this site, Macarius helps show the world Moses entered: a world of elders, cells, prayer, confession, and stern mercy.",
    ],
    image: {
      alt: "Icon-inspired image of elderly Saint Macarius blessing disciples near the end of his life",
      caption:
        "At the end of his life, Macarius blesses the brothers and hands on the monastic tradition he received.",
      height: 1536,
      src: "/images/macarius-father-remembered.png",
      width: 1024,
    },
    references: ["macarius-oca-life", "macarius-oca-hymns"],
  },
];

export const macariusTeachingSections: ResearchSection[] = [
  {
    eyebrow: "Humility",
    title: "Accused And Silent",
    body: [
      "The false accusation story is central to Macarius' remembered humility. He does not simply suffer quietly because he is passive; he accepts concrete responsibility for the person who has wronged him.",
      "His silence exposes something different from cowardice. Macarius refuses to make his innocence the most important public fact about him.",
      "When he is later vindicated, he leaves rather than receiving praise. The shape of the story is important: he is hidden under blame, and then he hides again from honor.",
    ],
    references: ["macarius-oca-life", "sayings"],
  },
  {
    eyebrow: "Prayer",
    title: "Short Prayer From The Heart",
    body: [
      "One saying associated with Abba Macarius teaches a brother that prayer does not require many words. The monk is told to stretch out his hands and ask the Lord for mercy and help.",
      "This counsel is simple, but not shallow. Macarius turns prayer away from performance and toward dependence.",
      "The same pattern appears throughout the desert tradition: the prayer that saves is not impressive speech, but the heart turned toward God with need, attention, and trust.",
    ],
    references: ["sayings", "macarius-orthodoxwiki"],
  },
  {
    eyebrow: "Cell",
    title: "Stay In The Cell",
    body: [
      "Macarius is also remembered in the sayings tradition for counsel that keeps the monk inside the place of repentance rather than chasing novelty.",
      "The cell is not treated as a private spiritual brand. It is the place where the monk is stripped of distraction and learns what is really happening in the heart.",
      "This gives Macarius a natural kinship with Moses the Black, whose own saying about the cell teaches the same desert truth: the place of obedience becomes the place of revelation.",
    ],
    references: ["sayings", "oca-life"],
  },
  {
    eyebrow: "Mercy",
    title: "Helping The Thief",
    body: [
      "The thief story is one of the clearest examples of Macarius' strange desert mercy. He sees his goods being stolen and chooses not to shame the thief.",
      "Instead, he helps load the animal, treating his possessions as already surrendered to God. The story is not a rule for property; it is an icon of freedom from possessiveness.",
      "Macarius' mercy is not sentimental. It is severe because it asks whether even being wronged can become a place of prayer.",
    ],
    references: ["macarius-oca-life", "sayings"],
  },
  {
    eyebrow: "Discernment",
    title: "The Two Married Women",
    body: [
      "One story says that Macarius wanted to learn who had attained a high spiritual measure. He was directed not to famous ascetics, but to two married women living faithfully in an ordinary household.",
      "The lesson matters for a page about a great monk: holiness is not trapped inside the desert. The desert elder is able to recognize hidden holiness in a household because he is not protecting his own status.",
      "Macarius' discernment therefore widens rather than narrows the reader's imagination. The cell teaches, but God is not absent from the village.",
    ],
    references: ["macarius-oca-life", "palladius-lausiac"],
  },
  {
    eyebrow: "Spiritual fatherhood",
    title: "Wisdom Without Display",
    body: [
      "Macarius is remembered as a discerning elder, but the tradition does not make discernment into cleverness. It is wisdom purified by repentance.",
      "The elder sees clearly because he has learned not to center himself. His authority is quiet, patient, and often indirect.",
      "Beside Moses the Black, Macarius shows another face of desert fatherhood: not the dramatic conversion from violence, but the long purification of humility, attention, and mercy.",
    ],
    references: ["sayings", "macarius-oca-life"],
  },
];

export const macariusSourceGroups = [
  {
    title: "Church Sources",
    references: ["macarius-oca-life", "macarius-oca-hymns"],
  },
  {
    title: "Sayings And Early Desert Tradition",
    references: ["sayings", "palladius-lausiac"],
  },
  {
    title: "Context",
    references: ["macarius-orthodoxwiki"],
  },
];
