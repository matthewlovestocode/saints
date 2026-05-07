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
    note: "An accessible PDF of the Alphabetical Collection, including sayings attributed to Abba Anthony, Abba Moses, and broader desert-monastic context.",
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
  "anthony-oca-life": {
    id: "anthony-oca-life",
    title: "OCA Life",
    publisher: "Orthodox Church in America",
    url: "https://www.oca.org/saints/lives/0201/01/17/100216-venerable-and-god-bearing-father-anthony-the-great",
    note: "Eastern Orthodox life of Venerable and God-bearing Father Anthony the Great, including his renunciation, desert warfare, disciples, and final instructions.",
  },
  "anthony-oca-hymns": {
    id: "anthony-oca-hymns",
    title: "OCA Hymns",
    publisher: "Orthodox Church in America",
    url: "https://www.oca.org/saints/troparia/2454/01/17",
    note: "Troparion and kontakion for Saint Anthony the Great, commemorated on January 17.",
  },
  "anthony-orthodoxwiki": {
    id: "anthony-orthodoxwiki",
    title: "OrthodoxWiki",
    publisher: "OrthodoxWiki",
    url: "https://orthodoxwiki.org/Anthony_the_Great",
    note: "Secondary overview of Saint Anthony the Great, his dates, place in Egyptian monasticism, and later reception.",
  },
  "athanasius-life-anthony": {
    id: "athanasius-life-anthony",
    title: "Life Of Anthony",
    publisher: "Athanasius of Alexandria, English translation hosted by Elpenor",
    url: "https://www.elpenor.org/athanasius/anthony-life.asp",
    note: "Classic early life of Anthony by Saint Athanasius of Alexandria, one of the formative texts for Christian monastic memory.",
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
  {
    name: "Anthony the Great",
    slug: "anthony-the-great",
    titles: [
      "Anthony of Egypt",
      "Antony the Great",
      "Father of Monasticism",
      "God-bearing Father",
    ],
    feastDay: "January 17",
    period: "3rd-4th century; traditional dates c. 251-356",
    location: "Egypt; Thebaid and inner desert",
    summary:
      "A foundational desert father whose life of renunciation, prayer, spiritual warfare, counsel, and hidden authority became a model for Christian monasticism.",
    image: "/images/anthony-the-great.png",
    facts: [
      { label: "Commemoration", value: "January 17" },
      { label: "Tradition", value: "Father of monasticism" },
      { label: "Place", value: "Egyptian desert" },
    ],
    pages: [
      {
        title: "Overview",
        href: "/saints/anthony-the-great",
        description: "A researched introduction to Saint Anthony the Great.",
      },
      {
        title: "Life",
        href: "/saints/anthony-the-great/life",
        description: "His renunciation, desert struggle, and fatherhood.",
      },
      {
        title: "Teachings",
        href: "/saints/anthony-the-great/teachings",
        description: "Themes and counsel associated with Abba Anthony.",
      },
      {
        title: "Sources",
        href: "/saints/anthony-the-great/sources",
        description: "Primary references for further reading.",
      },
    ],
  },
];

export const mosesTheBlack = saints[0];
export const macariusTheGreat = saints[1];
export const anthonyTheGreat = saints[2];

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

export const anthonyOverviewSections: ResearchSection[] = [
  {
    eyebrow: "Desert father",
    title: "A Father Of Monasticism",
    body: [
      "Anthony the Great is remembered as one of the decisive fathers of Egyptian monasticism. The OCA life calls him the Father of monasticism and presents his life as a pattern of renunciation, ascetic struggle, discernment, and spiritual fatherhood.",
      "His importance is not that he invented every form of ascetic life. Christians had fasted, prayed, practiced virginity, and given away possessions before him. Anthony's importance is that his life made the desert visible as a school of prayer for the wider Church.",
      "The remembered arc is strikingly clear: a young Egyptian hears the Gospel as a direct summons, gives away his inheritance, learns from local ascetics, enters solitude, endures temptation, becomes a guide to monks, and then speaks for the Orthodox faith when the Church is under pressure.",
      "Anthony is therefore not simply a solitary hero. He is an anchorite whose hidden life becomes fruitful for others. The more he withdraws from reputation, the more his life becomes a point of orientation for monks, bishops, emperors, philosophers, and ordinary Christians.",
      [
        "In the story of ",
        {
          href: "/saints/macarius-the-great",
          text: "Macarius the Great",
        },
        ", Anthony appears as the elder who tests and recognizes another desert father. That encounter helps show Anthony's place in the living chain of monastic formation: the desert life is received, tested, and handed on.",
      ],
    ],
    references: ["anthony-oca-life", "athanasius-life-anthony", "anthony-orthodoxwiki"],
  },
  {
    eyebrow: "Names",
    title: "Anthony Of Egypt",
    body: [
      "The sources call him Anthony the Great, Antony the Great, Anthony of Egypt, Anthony of the Desert, Anthony the Anchorite, and Venerable and God-bearing Father Anthony. These names gather both his Egyptian setting and his later honor in the Church.",
      "The title Father of Monasticism points to influence rather than possession. Anthony did not turn the desert into his personal territory. His withdrawal became a form of life that drew disciples, readers, and imitators because it was transparently ordered toward God.",
      "The OCA life places his birth in the village of Coma near the desert of the Thebaid in 251. OrthodoxWiki gives the broader traditional memory of an upper Egyptian saint whose life belongs to the third and fourth centuries.",
      "His feast is kept on January 17, close to the commemoration of Macarius the Great on January 19. In the calendar, as in the stories, Anthony stands near the other Egyptian desert fathers whose lives unfold under his shadow and blessing.",
    ],
    references: ["anthony-oca-life", "anthony-oca-hymns", "anthony-orthodoxwiki"],
  },
  {
    eyebrow: "Liturgical memory",
    title: "The Desert Made A City",
    body: [
      "Anthony's hymnography remembers him not as a man who escaped the Church, but as one whose prayer upheld it. The troparion compares his zeal to Elias and his straight path to John the Baptist.",
      "The same hymn says that Anthony made the desert a city. That phrase is a compact image of monastic fruitfulness: the apparently empty place becomes inhabited by prayer, discipline, counsel, and communion.",
      "The kontakion calls him the foundation of the Fathers. The title does not flatten the distinctness of later elders like Pachomius, Macarius, or Moses. It names Anthony as a first great visible pillar in the received memory of desert monastic life.",
    ],
    references: ["anthony-oca-hymns"],
  },
  {
    eyebrow: "Sources",
    title: "A Life That Taught The Church",
    body: [
      "Anthony's life is known especially through the Life of Anthony attributed to Saint Athanasius of Alexandria. That text shaped how later Christians imagined the desert, spiritual struggle, and the authority of a holy elder.",
      "The OCA life follows the same broad movement: hearing the Gospel, caring for his sister, beginning ascetic practice near home, entering stricter solitude, enduring demonic assault, guiding disciples, visiting Alexandria, and giving final instructions before his repose.",
      "Athanasius' Life is also important because it is a theological portrait, not merely a diary. It presents Anthony as proof that Christ's victory is real in the body and in the mind of a person who prays, fasts, works, and resists despair.",
      "Read beside Macarius and Moses, Anthony helps set the larger frame: the desert is not only a place of solitude, but a place where spiritual fatherhood is tested, recognized, and handed on.",
    ],
    references: ["athanasius-life-anthony", "anthony-oca-life", "anthony-oca-hymns"],
  },
  {
    eyebrow: "Place in this site",
    title: "The Elder Behind The Elders",
    body: [
      "Anthony belongs naturally beside Macarius and Moses because he helps explain the world they enter. The desert already has a grammar by the time their stories mature: obedience, handwork, fasting, night prayer, silence, hospitality, discernment, and counsel from elders.",
      "Macarius meets Anthony as a younger monk being tested. Moses enters a monastic world shaped by elders whose authority is not worldly rank but holiness learned through repentance.",
      "Anthony's page therefore serves as a doorway into the earlier generation of Egyptian monastic memory. He is not the whole desert tradition, but he is one of its first great faces.",
    ],
    references: ["anthony-oca-life", "macarius-oca-life", "sayings"],
  },
  {
    eyebrow: "Sayings",
    title: "The Short Wisdom Of Abba Anthony",
    body: [
      "The Sayings of the Desert Fathers preserve Anthony in another register. The Life gives a broad narrative; the sayings give flashes of practical judgment.",
      "In these sayings, Anthony is not only severe. He teaches perseverance, but also measure. He warns against temptation, but also against trusting in one's own righteousness. He honors solitude, but knows that brothers can break if they are stretched beyond their strength.",
      "This is important for reading him well. Anthony's desert is demanding, but not mechanical. The elder knows that salvation is not produced by intensity alone; it is formed through humility, discernment, Scripture, prayer, mercy, and love.",
    ],
    references: ["sayings", "anthony-oca-life"],
  },
];

export const anthonyTimeline: TimelineEntry[] = [
  {
    label: "Early life",
    title: "A Serious Child In Egypt",
    body: [
      "The OCA life remembers Anthony as born in Egypt in 251, in the village of Coma near the Thebaid. His parents are described as pious Christians of honorable standing, and Anthony is remembered as a serious child who listened attentively in church.",
      "This first portrait is quiet but important. Anthony's later radicalism does not begin with contempt for ordinary Christian life. It begins with a child who loves the services, remembers Scripture, and receives the faith from his household.",
      "The tradition also stresses obedience to his parents. Before Anthony becomes an elder of the desert, he is shown as someone capable of receiving formation. That capacity to listen remains one of the hidden foundations of his later authority.",
    ],
    references: ["anthony-oca-life"],
  },
  {
    label: "Renunciation",
    title: "Hearing The Gospel",
    body: [
      "When Anthony was about twenty, his parents died and he became responsible for his younger sister. The story does not let renunciation erase family duty; his first discernment includes the practical care of another person.",
      "About six months later, he entered church while thinking about the believers in Acts who sold possessions and gave to those in need. Then he heard Christ's words to the rich young man: sell, give to the poor, and follow.",
      "Anthony received that Gospel as addressed to him. He distributed his inheritance, entrusted his sister to the care of Christian virgins, and began the ascetic life near his village.",
      "This beginning matters because Anthony's withdrawal is not presented as private restlessness. It is obedience to Christ, practiced through poverty, responsibility, prayer, and watchfulness.",
    ],
    image: {
      alt: "Coptic icon-inspired image of young Saint Anthony hearing the Gospel and turning toward renunciation",
      caption:
        "Anthony hears the Gospel as a direct summons, gives away his inheritance, and begins the ascetic path.",
      height: 1536,
      src: "/images/anthony-hearing-gospel-renunciation.png",
      width: 1024,
    },
    references: ["anthony-oca-life", "athanasius-life-anthony"],
  },
  {
    label: "Formation",
    title: "Handwork, Alms, And Elders",
    body: [
      "Anthony's first ascetic life was close to home. He lived in a hut near the village, worked with his hands, supported himself, and gave alms to the poor.",
      "He also visited other ascetics in the region and sought benefit from each of them. The picture is not of a self-invented solitary who needs no one, but of a young man gathering wisdom from those already practiced in the life.",
      "This part of the story grounds Anthony's later authority. His solitude grows out of obedience, manual labor, Scripture, poverty, and counsel. The desert father first becomes a disciple.",
    ],
    references: ["anthony-oca-life", "athanasius-life-anthony"],
  },
  {
    label: "Temptation",
    title: "The First Battles",
    body: [
      "The OCA life remembers Anthony's early temptations as concrete and inward: memories of former comfort, anxiety over his sister, doubts about the path he had chosen, and bodily desire.",
      "Anthony answers these not with bravado, but with prayer, meditation on Christ, fasting, and the remembrance of judgment. The struggle is psychological, bodily, and spiritual at once.",
      "The story also includes a vision of an angel alternating prayer and work. Anthony receives this as instruction: the ascetic life is not vague intensity, but a rhythm in which prayer and labor hold one another steady.",
    ],
    image: {
      alt: "Coptic icon-inspired image of Saint Anthony praying beside palm fibers and a basket during his first ascetic battles",
      caption:
        "Anthony learns the rhythm of prayer and handwork while early temptations test his resolve.",
      height: 1536,
      src: "/images/anthony-first-battles-prayer-work.png",
      width: 1024,
    },
    references: ["anthony-oca-life", "athanasius-life-anthony"],
  },
  {
    label: "Tombs",
    title: "Alone Among The Graves",
    body: [
      "Seeking greater solitude, Anthony moved farther from the village and shut himself in a tomb, asking a friend to bring bread at appointed times.",
      "The tradition remembers this place as a severe arena of spiritual warfare. Demonic assault leaves him wounded, and his friend carries him back as if dead. When Anthony revives, he asks to be taken back to the same place.",
      "The point is not morbid fascination with tombs. Anthony's return shows perseverance. He does not treat suffering as proof that God has abandoned him, nor does he allow fear to define the boundary of obedience.",
    ],
    image: {
      alt: "Coptic icon-inspired image of Saint Anthony praying among Egyptian tombs during spiritual struggle",
      caption:
        "Among the tombs, Anthony returns to prayer and learns perseverance in the place of fear.",
      height: 1536,
      src: "/images/anthony-among-tombs-struggle.png",
      width: 1024,
    },
    references: ["anthony-oca-life", "athanasius-life-anthony"],
  },
  {
    label: "Consolation",
    title: "Christ Present In The Struggle",
    body: [
      "One of the central scenes in Anthony's life comes after a renewed attack in the tomb. The tradition says light appeared, the demons vanished, and Anthony cried out to Christ, asking why help had not appeared from the beginning.",
      "The answer he receives is that Christ had been present and had seen his struggle. Anthony is healed and strengthened, not because struggle was unreal, but because it had been endured with trust.",
      "This moment gives a key to the whole Anthony tradition. The desert does not mean the absence of anguish. It means learning to discover Christ's presence without making immediate relief the measure of faithfulness.",
    ],
    references: ["anthony-oca-life", "athanasius-life-anthony"],
  },
  {
    label: "Fort",
    title: "Twenty Years Behind Stones",
    body: [
      "At about thirty-five, Anthony sought the deeper desert. He crossed the river, found an abandoned fort, and settled there, barricading the entrance with stones while a friend brought bread only rarely.",
      "The OCA life remembers him spending twenty years there in isolation and struggle. When the entrance was finally opened, those who came to him found not a broken or embittered man, but an elder marked by calm.",
      "This is one of the great paradoxes of Anthony's life. Hiddenness does not make him less human. It makes him more available to others because his inner life has been purified by patience.",
    ],
    image: {
      alt: "Coptic icon-inspired image of Saint Anthony praying inside an abandoned desert fort sealed with stones",
      caption:
        "Anthony's long hidden life in the abandoned fort becomes a place of purification and quiet strength.",
      height: 1536,
      src: "/images/anthony-twenty-years-behind-stones.png",
      width: 1024,
    },
    references: ["anthony-oca-life", "athanasius-life-anthony"],
  },
  {
    label: "Fatherhood",
    title: "The Desert Becomes A City",
    body: [
      "After Anthony emerged from the fort, disciples gathered around him. The OCA life says the area around his cell became surrounded by monasteries, and Anthony acted as father and guide to those seeking salvation.",
      "His counsel strengthened monks who were already struggling and stirred others to love the ascetic life. He urged them not to grow faint-hearted, not to fear demonic assaults, and not to rely on themselves.",
      "This is the moment hymnography later compresses into the image of the desert made a city. The empty place becomes a community of prayer because one man's hidden obedience becomes fruitful for many.",
    ],
    image: {
      alt: "Coptic icon-inspired image of Saint Anthony blessing monks as the desert becomes a city of cells",
      caption:
        "Anthony emerges as a father of monks, and the desert becomes inhabited by prayer, work, and counsel.",
      height: 1536,
      src: "/images/anthony-desert-becomes-city.png",
      width: 1024,
    },
    references: ["anthony-oca-life", "anthony-oca-hymns"],
  },
  {
    label: "Measure",
    title: "The Bow That Must Not Break",
    body: [
      "The Sayings remember a hunter seeing Anthony at ease with the brethren and becoming scandalized. Anthony asks him to keep drawing and shooting his bow until the hunter objects that the bow will break if bent too far.",
      "Anthony applies the image to the work of God: brothers can also break if they are stretched beyond measure. Sometimes the elder must come down to meet their need.",
      "This saying keeps Anthony from being read as a one-note ascetic. The father of monks knows severity, but he also knows proportion. Human beings are not saved by being snapped.",
    ],
    image: {
      alt: "Coptic icon-inspired image of Saint Anthony teaching a hunter and monks with the bow that must not break",
      caption:
        "Anthony teaches measure through the bow: discipline must serve salvation rather than break the person.",
      height: 1536,
      src: "/images/anthony-bow-that-must-not-break.png",
      width: 1024,
    },
    references: ["sayings"],
  },
  {
    label: "Martyrs",
    title: "Alexandria During Persecution",
    body: [
      "In 311, during persecution under Maximian, Anthony left the desert and went to Alexandria. The tradition says he wished to suffer with the martyrs and openly ministered to Christians in prison.",
      "He accompanied confessors through trial and execution, but he was preserved from martyrdom. The story is careful: Anthony does not seek safety as an idol, but neither does he choose the hour of his own death.",
      "His presence in Alexandria shows that desert withdrawal and love for the Church are not opposites. The solitary returns when the suffering body of Christ needs consolation.",
    ],
    references: ["anthony-oca-life"],
  },
  {
    label: "Inner desert",
    title: "Farther Away, Still Sought",
    body: [
      "After the persecution, Anthony returned to the desert. As crowds came seeking healing, exorcism, and counsel, he withdrew even farther into the inner desert and settled on a high mountain.",
      "This withdrawal is not coldness toward the people who sought him. It is the same pattern seen throughout his life: he receives others, then returns to hidden prayer so that his service does not become performance.",
      "The brethren continued to seek him out, and Anthony still visited communities when needed. His solitude remained porous to charity, but resistant to fame.",
    ],
    references: ["anthony-oca-life"],
  },
  {
    label: "Church",
    title: "Defending The Faith",
    body: [
      "Anthony was not remembered only as a solitary. The tradition says he came again to Alexandria to defend the Orthodox faith against Manichaean and Arian teaching.",
      "Because his name was honored, Arians tried to claim him. Anthony publicly rejected that claim and denounced Arianism in the presence of the bishop.",
      "This public witness is important because Anthony's desert authority serves the Church rather than standing apart from it. The elder who flees empty attention can still appear when confession of the faith is required.",
    ],
    image: {
      alt: "Coptic icon-inspired image of Saint Anthony defending the Orthodox faith in Alexandria beside a bishop",
      caption:
        "Anthony leaves the desert when the Church needs witness, defending the faith in Alexandria with calm authority.",
      height: 1536,
      src: "/images/anthony-defending-faith-alexandria.png",
      width: 1024,
    },
    references: ["anthony-oca-life", "anthony-orthodoxwiki"],
  },
  {
    label: "Scripture",
    title: "Learning To Say I Do Not Know",
    body: [
      "The Sayings remember Anthony asking elders to interpret a passage of Scripture. Each offers an explanation, but Anthony says they have not understood it. When Abba Joseph answers that he does not know, Anthony says Joseph has found the way.",
      "The point is not anti-intellectualism. Anthony is teaching that Scripture is approached with humility, not with the need to sound wise.",
      "Another saying shows Anthony going deep into the desert to pray for understanding of a difficult passage. The elder who guides others remains a learner before God.",
    ],
    references: ["sayings"],
  },
  {
    label: "Mercy",
    title: "Receiving The Brother Who Fell",
    body: [
      "One saying remembers a brother being cast out of his monastery and coming to Anthony. Anthony sends him back, but when the brothers reject him again, the case is answered with a parable about helpers who push a stuck man deeper into the mud.",
      "Anthony recognizes the wisdom of that parable and the brothers are pierced to the heart. The fallen brother is received back.",
      "This episode is one of the gentlest windows into Anthony's fatherhood. The elder does not deny sin, but he sees when correction has become crushing rather than healing.",
    ],
    references: ["sayings"],
  },
  {
    label: "City",
    title: "An Equal In The City",
    body: [
      "The Sayings also remember Anthony learning that someone equal to him was living in the city: a physician who gave whatever he had beyond his needs to the poor and praised God daily.",
      "This story matters because it prevents the desert from becoming spiritual pride. Anthony is a father of monks, but holiness is not imprisoned in monastic geography.",
      "The desert trains perception. A true elder can recognize grace outside the desert without feeling diminished by it.",
    ],
    references: ["sayings"],
  },
  {
    label: "Counsel",
    title: "Philosophers And Emperors",
    body: [
      "Anthony's fame reached beyond monastic circles. The OCA life remembers pagan philosophers coming to test or mock him because he lacked formal education, only to be silenced by the clarity of his words.",
      "Emperor Constantine and his sons also wrote to Anthony. His reply honors faith in Christ but turns imperial attention toward judgment and the true kingship of Christ.",
      "These scenes show the strange authority of the desert elder. Anthony does not possess civic office or polished schooling, yet his life has given him a freedom from flattery that makes his counsel weighty.",
    ],
    references: ["anthony-oca-life", "anthony-orthodoxwiki"],
  },
  {
    label: "Macarius",
    title: "Recognizing Another Father",
    body: [
      [
        "Anthony also appears inside the life of ",
        {
          href: "/saints/macarius-the-great",
          text: "Macarius the Great",
        },
        ". The OCA life of Macarius remembers Anthony testing him through the work of soaking and plaiting palm branches.",
      ],
      "When Macarius endured the labor without complaint, Anthony recognized the grace at work in him. The test is ordinary work, but the insight is spiritual: patience reveals what claims cannot prove.",
      "This episode helps connect the saints on this site. Anthony is not only a subject of memory; he is a father whose discernment helps name the holiness of another desert elder.",
    ],
    references: ["macarius-oca-life", "anthony-oca-life"],
  },
  {
    label: "Repose",
    title: "Final Instructions",
    body: [
      "Anthony is traditionally remembered as reposing in 356 at the age of 105, after eighty-five years in the solitary desert.",
      "Near his death, he instructed the brethren to preserve the Orthodox faith, avoid negligence in monastic struggle, and seek union first with the Lord and then with the saints.",
      "He told two disciples to bury him secretly in the desert, not in Alexandria. The hidden grave is a final act consistent with his whole life: even after death, Anthony refuses to become a spectacle.",
      "The OCA life remembers him leaving monastic garments to Saint Athanasius and Saint Serapion, a final sign of his bond with the Church and with the elders who preserved his memory.",
      [
        "Later tradition places Anthony among the fathers who appear near the death of ",
        {
          href: "/saints/macarius-the-great",
          text: "Macarius the Great",
        },
        ", blessing the preservation of the monastic rule and traditions received in the desert.",
      ],
    ],
    image: {
      alt: "Coptic icon-inspired image of elderly Saint Anthony giving final instructions to two disciples in the desert",
      caption:
        "At the end of his life, Anthony blesses his disciples and asks that his burial remain hidden in the desert.",
      height: 1536,
      src: "/images/anthony-final-instructions-hidden-grave.png",
      width: 1024,
    },
    references: ["anthony-oca-life", "macarius-oca-life"],
  },
  {
    label: "Relics",
    title: "A Hidden Grave And Later Memory",
    body: [
      "The tradition of Anthony's burial emphasizes secrecy, but later memory also preserves accounts of his relics being transferred: first to Alexandria, later to Constantinople, and eventually westward.",
      "This tension is fitting. Anthony wanted hiddenness, yet the Church could not forget him. His body was buried quietly, while his life continued to travel through hagiography, hymnography, monastic rules, icons, and sayings.",
      "The history after his death shows how a man who fled public honor became one of the most widely remembered ascetics in Christian history.",
    ],
    references: ["anthony-oca-life", "anthony-orthodoxwiki"],
  },
];

export const anthonyTeachingSections: ResearchSection[] = [
  {
    eyebrow: "Renunciation",
    title: "The Gospel Taken Personally",
    body: [
      "Anthony's remembered life begins with a direct hearing of the Gospel. He does not treat Christ's word to sell possessions and follow Him as a distant ideal for someone else.",
      "The important detail is that Anthony also cares for his sister. Renunciation is not abandonment dressed up as holiness. It is obedience shaped by charity, responsibility, and trust.",
      "His poverty opens into a lifelong pattern of prayer, handwork, discipline, and freedom from possessiveness. The command of Christ becomes concrete, bodily, and daily.",
      "This gives his life its force for later monasticism. Anthony shows that the Gospel can be received with frightening seriousness, and that such seriousness can become joy rather than bitterness.",
    ],
    references: ["anthony-oca-life", "athanasius-life-anthony"],
  },
  {
    eyebrow: "Prayer and labor",
    title: "The Angel's Rhythm",
    body: [
      "The vision of the angel alternating prayer and work is one of the clearest teaching moments in Anthony's early life.",
      "It keeps ascetic life from becoming either disembodied prayer or mere productivity. The monk prays, works, prays again, and works again; the body and soul learn one rhythm.",
      "This rhythm also connects Anthony with the later desert world of basket weaving, rope making, water carrying, and hidden service. Manual labor is not a distraction from holiness. It becomes one way humility takes shape.",
    ],
    references: ["anthony-oca-life", "athanasius-life-anthony"],
  },
  {
    eyebrow: "Watchfulness",
    title: "Spiritual Warfare Without Despair",
    body: [
      "Anthony's stories are full of demonic trial, but the point is not fascination with darkness. The tradition uses those scenes to show endurance, discernment, and reliance on Christ.",
      "His temptations include memories, anxieties, bodily impulses, fear, and pride. That range matters because spiritual warfare is not only dramatic external assault; it is also the ordinary struggle of thoughts.",
      "Anthony teaches that temptation should be exposed and resisted, not magnified into the center of attention. The mature monk becomes sober without becoming frantic, and courageous without trusting in himself.",
      "The Cross, prayer, Scripture, fasting, and humility are the weapons in these stories. Victory belongs to Christ, not to Anthony's temperament.",
    ],
    references: ["athanasius-life-anthony", "anthony-oca-life"],
  },
  {
    eyebrow: "Discernment",
    title: "Testing What Appears Holy",
    body: [
      "Anthony is remembered as an elder of discernment. He warns monks that impressive experiences, visions, and inner movements must be tested rather than accepted simply because they feel powerful.",
      "That discernment becomes visible in his encounter with Macarius, where humble labor reveals more than outward claims could have shown.",
      "For Anthony, spiritual authority is not performance. It is patience, obedience, humility, and the quiet fruit of a life turned toward God.",
      "This gives his counsel a continuing relevance beyond monastic settings. Not every intense inner experience is illumination, and not every hidden obedience is small.",
    ],
    references: ["anthony-oca-life", "athanasius-life-anthony", "macarius-oca-life"],
  },
  {
    eyebrow: "Hiddenness",
    title: "Authority That Flees Display",
    body: [
      "Anthony's withdrawal into the inner desert is not a rejection of charity. It is a refusal to let reputation become the shape of his life.",
      "The tradition remembers people seeking him precisely because he did not organize himself around being sought. His authority grows in proportion to his freedom from applause.",
      "His hidden burial completes the same pattern. Anthony gives even his death back to the desert, asking that his body not become an occasion for spectacle or possession.",
      "His hiddenness gives a pattern shared by later desert fathers: the elder becomes trustworthy by being less interested in appearing great than in being faithful.",
    ],
    references: ["anthony-oca-life", "anthony-orthodoxwiki"],
  },
  {
    eyebrow: "Fearlessness",
    title: "Do Not Fear The Enemy",
    body: [
      "Anthony's counsel repeatedly refuses fear. He does not deny temptation or demonic malice, but he insists that the monk should not be ruled by terror.",
      "The reason is theological: Christ is stronger than the powers that trouble the soul. The Cross is not an ornament in Anthony's life; it is the sign under which the monk resists.",
      "This fearlessness is not bravado. Anthony is wounded, tested, and exhausted in the stories. Courage means remaining with God inside the struggle, not pretending the struggle is easy.",
    ],
    references: ["anthony-oca-life", "athanasius-life-anthony"],
  },
  {
    eyebrow: "Humility",
    title: "Blame, Temptation, And The Last Breath",
    body: [
      "Several sayings associated with Anthony are almost painfully direct about humility. He teaches that a person should take blame for his own sins before God and expect temptation until his last breath.",
      "This does not mean morbid self-hatred. It means the monk stops treating spiritual struggle as an embarrassing interruption and accepts repentance as the normal shape of the life.",
      "Anthony also warns against trusting in one's own righteousness. The elder knows that self-confidence can dress itself in religious clothing, so he keeps the monk close to watchfulness and mercy.",
    ],
    references: ["sayings"],
  },
  {
    eyebrow: "Measure",
    title: "Do Not Break The Bow",
    body: [
      "The hunter and the bow story gives Anthony's asceticism a humane edge. The bow that is bent without rest will break; the brother stretched beyond measure may also break.",
      "This does not weaken Anthony's discipline. It reveals its intelligence. The goal is salvation, not maximum strain.",
      "A mature elder therefore knows when to press and when to relieve, when to call a brother higher and when to come down to meet his need.",
    ],
    references: ["sayings"],
  },
  {
    eyebrow: "Scripture",
    title: "The Wisdom Of Not Knowing",
    body: [
      "Anthony's sayings about Scripture are marked by humility. When others rush to explain a passage, the one who says he does not know is praised as having found the way.",
      "Another saying shows Anthony withdrawing to pray for understanding rather than performing expertise in front of the brothers.",
      "This is a desert approach to theology: Scripture is not mastered as an object. It is received with prayer, patience, fear of God, and the willingness to be taught.",
    ],
    references: ["sayings"],
  },
  {
    eyebrow: "Mercy",
    title: "Saving The Fallen Brother",
    body: [
      "The story of the expelled brother shows Anthony's discernment as mercy. A brother has fallen or been accused, and the community's attempts to correct him only drive him deeper into distress.",
      "Anthony recognizes the word that can save a soul rather than crush it. The result is not permissiveness, but restoration.",
      "This mercy places Anthony close to the later desert fathers on this site. Macarius helps a thief load stolen goods; Moses refuses to judge while his own sins fall behind him. Anthony, too, knows that fatherhood must heal and not merely expose.",
    ],
    references: ["sayings", "macarius-oca-life", "antioch"],
  },
  {
    eyebrow: "Hidden holiness",
    title: "An Equal Outside The Desert",
    body: [
      "Anthony's revelation about the city physician is one of the most important correctives in the tradition. A monk may flee the city, but God has not fled it.",
      "The doctor gives beyond his needs and praises God daily. His holiness is ordinary in form, but not small.",
      "Anthony's greatness includes his freedom to receive that lesson. The father of monks can be told that his equal is a layman in the city, and the story does not make him smaller. It makes the mercy of God larger.",
    ],
    references: ["sayings"],
  },
  {
    eyebrow: "Love",
    title: "From Fear Toward Love",
    body: [
      "One saying attributed to Anthony says that he no longer fears God, but loves Him, because love casts out fear.",
      "Read beside his severe counsel about judgment, fasting, and vigilance, this saying is especially important. Anthony's austerity is not an end in itself. It is ordered toward love.",
      "The beginning of the path may involve fear, sobriety, and painful struggle. The maturity of the path is communion with God in love.",
    ],
    references: ["sayings"],
  },
  {
    eyebrow: "Church",
    title: "Solitude In Service Of The Faith",
    body: [
      "Anthony's visits to Alexandria show that desert solitude does not mean indifference to the Church. He comes when Christians are persecuted, and later when false teaching threatens the confession of Christ.",
      "His public witness has force because it comes from hidden prayer. Anthony is not chasing controversy, but he is also not neutral when the faith is being distorted.",
      "This gives his life a fuller shape than private asceticism. The desert elder belongs to the Church, prays for the Church, suffers with the Church, and speaks when the Church needs his witness.",
    ],
    references: ["anthony-oca-life", "anthony-orthodoxwiki"],
  },
  {
    eyebrow: "Fatherhood",
    title: "The Desert As A School",
    body: [
      "Anthony becomes a father because he first becomes a disciple. He learns Scripture, seeks counsel, works with his hands, fasts, prays, and returns to the struggle after defeat and injury.",
      "When disciples gather, he does not offer novelty. He gives them the tested pattern of a life already lived before God: perseverance, humility, vigilance, courage, and hope.",
      "This is why he belongs near Macarius and Moses. Anthony helps establish the desert as a school where repentance is not merely felt, but practiced until it becomes wisdom for others.",
    ],
    references: ["anthony-oca-life", "sayings", "macarius-oca-life"],
  },
  {
    eyebrow: "Death",
    title: "Keeping The End Hidden",
    body: [
      "Anthony's final instructions gather the whole meaning of his life: preserve the faith, remain diligent in the struggle, seek union with the Lord, and keep his burial hidden.",
      "He leaves garments to Athanasius and Serapion, but he does not leave a monument to himself. The tangible memory is modest; the spiritual inheritance is immense.",
      "His death teaches the same lesson as his life. The saint does not need to possess his legacy. He hands it over to God, to the Church, and to the disciples who must now live the tradition rather than merely admire it.",
    ],
    references: ["anthony-oca-life", "anthony-oca-hymns"],
  },
];

export const anthonySourceGroups = [
  {
    title: "Church Sources",
    references: ["anthony-oca-life", "anthony-oca-hymns"],
  },
  {
    title: "Classic Life",
    references: ["athanasius-life-anthony"],
  },
  {
    title: "Sayings And Desert Tradition",
    references: ["sayings"],
  },
  {
    title: "Context",
    references: ["anthony-orthodoxwiki", "macarius-oca-life"],
  },
];
