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
  body: string[];
  bullets?: string[];
  eyebrow?: string;
  references: string[];
  title: string;
};

export type TimelineEntry = {
  body: string[];
  label: string;
  references: string[];
  title: string;
};

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
    title: "Fellowship",
    publisher: "Fellowship of St. Moses the Black",
    url: "https://mosestheblack.org/",
    note: "Modern Orthodox organization connecting ancient African Christianity, the African American experience, and racial reconciliation.",
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
];

export const mosesTheBlack = saints[0];

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
      "This beginning matters because the sources do not soften the darkness around him. Moses is not introduced as a misunderstood hero, but as a man who had become dangerous to others and deeply wounded in his own soul.",
      "His physical strength, which had once been joined to violence, later becomes part of the story of his endurance in ascetic life. The same intensity that made him feared is slowly redirected toward repentance.",
    ],
    references: ["oca-life", "antioch", "st-takla"],
  },
  {
    label: "Conversion",
    title: "Turning Toward The Desert",
    body: [
      "After repentance, Moses sought admission to a desert monastery. The Coptic Synaxarium emphasizes Wadi El-Natroun and says he was brought by Isidore to Macarius the Great, who taught and baptized him.",
      "The movement into the desert was not an escape into privacy. In the monastic world of Scetis, Moses came under obedience, learned prayer, and accepted the discipline of elders who knew the life he was seeking.",
      "His conversion is remembered as both decisive and costly. He turns toward God, but the sources also show that old passions do not disappear simply because he has entered the monastery.",
    ],
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
    references: ["antioch", "sayings"],
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
    references: ["sayings", "oca-life"],
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
