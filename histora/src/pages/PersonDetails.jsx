import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  Globe2,
  Landmark,
  MapPin,
  Share2,
  Sparkles,
  Users,
  BookOpen,
  GraduationCap,
  Crown,
  X,
} from "lucide-react";

const peopleData = [
  {
    id: "shivaji-maharaj",
    name: "Chhatrapati Shivaji Maharaj",
    shortName: "Shivaji Maharaj",
    title: "Founder of the Maratha Empire",
    category: "Kings & Warriors",
    born: "19 February 1630",
    died: "3 April 1680",
    birthplace: "Shivneri Fort, Maharashtra, India",
    nationality: "Maratha",
    image:
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1600&q=85",
    introduction:
      "Chhatrapati Shivaji Maharaj was an Indian ruler and military strategist who established the foundation of the Maratha Empire. He is remembered for his military leadership, fort administration, and efforts to establish an independent kingdom.",
    biography: [
      "Shivaji Maharaj was born at Shivneri Fort in 1630. From an early age, he developed an understanding of the geography of the Sahyadri mountains and the strategic importance of forts.",
      "He built a powerful kingdom through military campaigns, diplomacy, and the effective administration of his territories. His forces became well known for their mobility and their use of the region's mountainous terrain.",
      "In 1674, Shivaji Maharaj was formally crowned Chhatrapati at Raigad Fort. His administration included organized revenue collection, a structured military, and a significant naval vision for protecting the Konkan coast.",
    ],
    achievements: [
      {
        title: "Established the Maratha Kingdom",
        description:
          "Built an independent kingdom that became a major power in Indian history.",
      },
      {
        title: "Fort-based military strategy",
        description:
          "Used strategic forts and knowledge of mountainous terrain to strengthen his military position.",
      },
      {
        title: "Coronation at Raigad",
        description:
          "Was crowned Chhatrapati in 1674, marking an important moment in Maratha history.",
      },
      {
        title: "Naval development",
        description:
          "Recognized the strategic importance of maritime power and coastal defence.",
      },
    ],
    timeline: [
      {
        year: "1630",
        title: "Birth",
        description: "Born at Shivneri Fort in present-day Maharashtra.",
      },
      {
        year: "1645",
        title: "Early campaigns",
        description:
          "Traditionally associated with the beginning of his efforts to establish Maratha control.",
      },
      {
        year: "1659",
        title: "Battle of Pratapgad",
        description:
          "The conflict with Afzal Khan became a significant episode in his rise.",
      },
      {
        year: "1666",
        title: "Visit to Agra",
        description:
          "His encounter with the Mughal court became a major turning point in his political career.",
      },
      {
        year: "1674",
        title: "Coronation",
        description: "Crowned Chhatrapati at Raigad Fort.",
      },
      {
        year: "1680",
        title: "Death",
        description: "Passed away at Raigad Fort.",
      },
    ],
    legacy:
      "Shivaji Maharaj remains an influential historical figure, particularly in Maharashtra. His legacy is associated with leadership, strategic warfare, administration, and the development of Maratha political power.",
    relatedEvent: "shivaji-maharaj",
  },

  {
    id: "mahatma-gandhi",
    name: "Mahatma Gandhi",
    shortName: "Mahatma Gandhi",
    title: "Leader of India's Independence Movement",
    category: "Leaders",
    born: "2 October 1869",
    died: "30 January 1948",
    birthplace: "Porbandar, Gujarat, India",
    nationality: "Indian",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85",
    introduction:
      "Mahatma Gandhi was a central figure in India's struggle for independence from British colonial rule. He promoted nonviolent resistance, civil disobedience, and mass political participation.",
    biography: [
      "Mohandas Karamchand Gandhi was born in Porbandar in 1869. He studied law in London and later travelled to South Africa, where his experiences with racial discrimination influenced his political philosophy.",
      "Gandhi developed and promoted satyagraha, a method of resistance based on truth and nonviolence. After returning to India, he became a leading figure in movements against British colonial rule.",
      "Campaigns associated with Gandhi included the Non-Cooperation Movement, the Salt March, and the Quit India Movement. His approach helped bring large sections of Indian society into the independence struggle.",
    ],
    achievements: [
      {
        title: "Promoted nonviolent resistance",
        description:
          "Popularized nonviolent protest as a method of political and social change.",
      },
      {
        title: "Salt March",
        description: "Led the 1930 march against the British salt laws.",
      },
      {
        title: "Mass participation",
        description:
          "Helped transform the independence movement into a broad-based popular struggle.",
      },
      {
        title: "Global influence",
        description:
          "Influenced later civil rights and nonviolent movements around the world.",
      },
    ],
    timeline: [
      {
        year: "1869",
        title: "Birth",
        description: "Born in Porbandar, Gujarat.",
      },
      {
        year: "1893",
        title: "Journey to South Africa",
        description:
          "Began a period that strongly influenced his political thinking.",
      },
      {
        year: "1915",
        title: "Return to India",
        description: "Returned to India after years of work in South Africa.",
      },
      {
        year: "1930",
        title: "Salt March",
        description:
          "Led a major act of civil disobedience against British salt laws.",
      },
      {
        year: "1942",
        title: "Quit India Movement",
        description:
          "Supported a major campaign demanding an end to British rule.",
      },
      {
        year: "1948",
        title: "Death",
        description: "Assassinated in New Delhi on 30 January.",
      },
    ],
    legacy:
      "Gandhi's philosophy of nonviolent resistance influenced political movements across the world. His role in India's independence remains widely studied and debated.",
    relatedEvent: "indian-independence",
  },

  {
    id: "albert-einstein",
    name: "Albert Einstein",
    shortName: "Albert Einstein",
    title: "Theoretical Physicist",
    category: "Scientists",
    born: "14 March 1879",
    died: "18 April 1955",
    birthplace: "Ulm, German Empire",
    nationality: "German-born theoretical physicist",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=85",
    introduction:
      "Albert Einstein was a theoretical physicist whose work transformed modern physics. He is best known for the theory of relativity and his contributions to the understanding of space, time, and energy.",
    biography: [
      "Albert Einstein was born in Ulm in 1879. He studied mathematics and physics and eventually worked at the Swiss Patent Office while developing ideas that would reshape theoretical physics.",
      "In 1905, often called his annus mirabilis or miracle year, Einstein published several influential scientific papers. These addressed the photoelectric effect, Brownian motion, special relativity, and the relationship between mass and energy.",
      "Einstein later developed the general theory of relativity, published in its final form in 1915. He received the Nobel Prize in Physics in 1921 for his explanation of the photoelectric effect.",
    ],
    achievements: [
      {
        title: "Special relativity",
        description:
          "Changed scientific understanding of space, time, and motion.",
      },
      {
        title: "General relativity",
        description:
          "Presented a new theory of gravity based on the curvature of spacetime.",
      },
      {
        title: "Nobel Prize",
        description:
          "Received the 1921 Nobel Prize in Physics for work on the photoelectric effect.",
      },
      {
        title: "Modern physics",
        description:
          "Contributed foundational ideas to the development of twentieth-century physics.",
      },
    ],
    timeline: [
      {
        year: "1879",
        title: "Birth",
        description: "Born in Ulm, in what was then the German Empire.",
      },
      {
        year: "1905",
        title: "Miracle year",
        description:
          "Published several landmark papers in theoretical physics.",
      },
      {
        year: "1915",
        title: "General relativity",
        description:
          "Presented the completed form of his general theory of relativity.",
      },
      {
        year: "1921",
        title: "Nobel Prize",
        description:
          "Awarded the Nobel Prize in Physics for the photoelectric effect.",
      },
      {
        year: "1933",
        title: "Moved to the United States",
        description: "Settled in the United States after leaving Germany.",
      },
      {
        year: "1955",
        title: "Death",
        description: "Died in Princeton, New Jersey.",
      },
    ],
    legacy:
      "Einstein's theories remain central to modern physics and have influenced cosmology, astronomy, and technologies that depend on precise measurements of time and gravity.",
    relatedEvent: "world-war-2",
  },

  {
    id: "cleopatra",
    name: "Cleopatra VII",
    shortName: "Cleopatra",
    title: "Last Active Ruler of Ptolemaic Egypt",
    category: "Kings & Warriors",
    born: "69 BCE",
    died: "30 BCE",
    birthplace: "Alexandria, Egypt",
    nationality: "Ptolemaic Egyptian ruler",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1600&q=85",
    introduction:
      "Cleopatra VII ruled Ptolemaic Egypt during a period of intense political competition in the Mediterranean. She is remembered for her political skill, diplomacy, and relationships with leading Roman figures.",
    biography: [
      "Cleopatra VII became co-ruler of Egypt in 51 BCE. She governed during a period when the expanding Roman Republic exerted increasing pressure on the eastern Mediterranean.",
      "She formed important political alliances with Julius Caesar and later Mark Antony. These relationships were closely connected to Egypt's independence and the shifting balance of power in Rome.",
      "After the defeat of Antony and Cleopatra's forces by Octavian, Egypt came under Roman control in 30 BCE. Cleopatra's life and reign subsequently became subjects of enduring historical and cultural interest.",
    ],
    achievements: [
      {
        title: "Political leadership",
        description:
          "Governed Egypt during a period of significant international pressure.",
      },
      {
        title: "Diplomacy",
        description:
          "Used alliances and negotiation to pursue Egypt's political interests.",
      },
      {
        title: "Cultural significance",
        description:
          "Became one of the most widely recognized rulers of the ancient world.",
      },
      {
        title: "Historical influence",
        description:
          "Her reign marked the final chapter of the Ptolemaic dynasty.",
      },
    ],
    timeline: [
      {
        year: "69 BCE",
        title: "Birth",
        description: "Born in Alexandria, Egypt.",
      },
      {
        year: "51 BCE",
        title: "Became ruler",
        description: "Began ruling Egypt alongside her brother Ptolemy XIII.",
      },
      {
        year: "48 BCE",
        title: "Roman civil war",
        description:
          "Became involved in the political struggle surrounding Julius Caesar.",
      },
      {
        year: "41 BCE",
        title: "Alliance with Mark Antony",
        description: "Formed a major political alliance with the Roman leader.",
      },
      {
        year: "31 BCE",
        title: "Battle of Actium",
        description: "Antony and Cleopatra's forces were defeated by Octavian.",
      },
      {
        year: "30 BCE",
        title: "Death",
        description: "Cleopatra died, and Egypt became a Roman province.",
      },
    ],
    legacy:
      "Cleopatra's reign symbolizes the final era of independent Ptolemaic Egypt. Her political career continues to attract historical research and cultural reinterpretation.",
    relatedEvent: "ancient-egypt",
  },

  {
    id: "isaac-newton",
    name: "Isaac Newton",
    shortName: "Isaac Newton",
    title: "Mathematician and Physicist",
    category: "Scientists",
    born: "4 January 1643",
    died: "31 March 1727",
    birthplace: "Woolsthorpe, England",
    nationality: "English",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=85",
    introduction:
      "Isaac Newton was a mathematician and physicist whose work shaped classical mechanics, optics, and mathematics. His laws of motion and universal gravitation became foundations of classical physics.",
    biography: [
      "Isaac Newton was born in England in 1643. He studied at the University of Cambridge, where his interests in mathematics and natural philosophy developed significantly.",
      "During the scientific work of the seventeenth century, Newton made major contributions to the understanding of motion, gravity, light, and calculus. His research helped unify the study of terrestrial and celestial motion.",
      "In 1687, Newton published Principia Mathematica, one of the most influential scientific works in history. It presented his laws of motion and universal gravitation.",
    ],
    achievements: [
      {
        title: "Laws of motion",
        description:
          "Formulated three laws that became central to classical mechanics.",
      },
      {
        title: "Universal gravitation",
        description:
          "Explained gravitational attraction through a mathematical framework.",
      },
      {
        title: "Optics",
        description:
          "Investigated light and color and built a reflecting telescope.",
      },
      {
        title: "Principia Mathematica",
        description:
          "Published a landmark work in mathematical physics in 1687.",
      },
    ],
    timeline: [
      {
        year: "1643",
        title: "Birth",
        description: "Born in Woolsthorpe, England.",
      },
      {
        year: "1665",
        title: "Scientific investigations",
        description:
          "Developed important ideas during a period away from Cambridge.",
      },
      {
        year: "1668",
        title: "Reflecting telescope",
        description: "Built an early practical reflecting telescope.",
      },
      {
        year: "1687",
        title: "Principia Mathematica",
        description: "Published his major work on motion and gravitation.",
      },
      {
        year: "1704",
        title: "Opticks",
        description: "Published an influential work on light and color.",
      },
      {
        year: "1727",
        title: "Death",
        description: "Died in London, England.",
      },
    ],
    legacy:
      "Newton's work shaped scientific thinking for centuries and remains essential to engineering, mechanics, astronomy, and many areas of applied physics.",
    relatedEvent: "french-revolution",
  },

  {
    id: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    shortName: "Leonardo da Vinci",
    title: "Renaissance Artist and Inventor",
    category: "Thinkers & Artists",
    born: "15 April 1452",
    died: "2 May 1519",
    birthplace: "Vinci, Republic of Florence",
    nationality: "Italian",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1600&q=85",
    introduction:
      "Leonardo da Vinci was an Italian artist, engineer, and observer of nature. His notebooks and artworks reflect the Renaissance ideal of combining artistic practice with scientific curiosity.",
    biography: [
      "Leonardo was born near Vinci in 1452 and trained in Florence. His artistic work developed alongside a deep interest in anatomy, engineering, architecture, and natural phenomena.",
      "He created celebrated works including the Mona Lisa and The Last Supper. His notebooks contain drawings and observations about machines, human anatomy, water, flight, and the movement of objects.",
      "Although many of his engineering concepts were not built during his lifetime, his notebooks demonstrate a remarkable effort to investigate the world through observation and design.",
    ],
    achievements: [
      {
        title: "Mona Lisa",
        description: "Painted one of the most famous portraits in art history.",
      },
      {
        title: "The Last Supper",
        description: "Created a landmark mural of the Italian Renaissance.",
      },
      {
        title: "Scientific notebooks",
        description:
          "Recorded detailed studies of anatomy, nature, mechanics, and engineering.",
      },
      {
        title: "Renaissance ideal",
        description:
          "Became an enduring example of the relationship between art and scientific inquiry.",
      },
    ],
    timeline: [
      {
        year: "1452",
        title: "Birth",
        description: "Born near Vinci in the Republic of Florence.",
      },
      {
        year: "1470s",
        title: "Artistic training",
        description:
          "Developed his skills in the Florentine artistic environment.",
      },
      {
        year: "1482",
        title: "Moved to Milan",
        description: "Worked as an artist and engineer at the Milanese court.",
      },
      {
        year: "1498",
        title: "The Last Supper",
        description:
          "His celebrated mural in Milan reached completion around this period.",
      },
      {
        year: "1503",
        title: "Mona Lisa",
        description:
          "Began work on the portrait commonly known as the Mona Lisa.",
      },
      {
        year: "1519",
        title: "Death",
        description: "Died in France.",
      },
    ],
    legacy:
      "Leonardo remains a symbol of Renaissance curiosity. His work continues to inspire artists, designers, engineers, and researchers.",
    relatedEvent: "ancient-egypt",
  },

  {
    id: "julius-caesar",
    name: "Julius Caesar",
    shortName: "Julius Caesar",
    title: "Roman General and Political Leader",
    category: "Kings & Warriors",
    born: "100 BCE",
    died: "44 BCE",
    birthplace: "Rome, Roman Republic",
    nationality: "Roman",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=85",
    introduction:
      "Julius Caesar was a Roman general and statesman whose military campaigns and political actions transformed the Roman Republic. His rise helped set the stage for the emergence of the Roman Empire.",
    biography: [
      "Caesar rose through Roman political life and developed a reputation as a military commander. His campaigns in Gaul expanded Roman territory and increased his political influence.",
      "In 49 BCE, Caesar crossed the Rubicon River with his army, initiating a civil war against the faction led by Pompey and his allies. He eventually emerged as Rome's dominant political figure.",
      "Caesar was appointed dictator and introduced several reforms. On 15 March 44 BCE, known as the Ides of March, he was assassinated by a group of senators.",
    ],
    achievements: [
      {
        title: "Gallic campaigns",
        description: "Expanded Roman control across much of Gaul.",
      },
      {
        title: "Political reforms",
        description:
          "Introduced changes to Roman administration and the calendar.",
      },
      {
        title: "Military leadership",
        description:
          "Became one of the most influential commanders of the late Roman Republic.",
      },
      {
        title: "Historical impact",
        description:
          "His rise and assassination accelerated the transformation of Roman government.",
      },
    ],
    timeline: [
      {
        year: "100 BCE",
        title: "Birth",
        description: "Born in Rome.",
      },
      {
        year: "60 BCE",
        title: "Political alliance",
        description:
          "Formed the political arrangement later known as the First Triumvirate.",
      },
      {
        year: "58 BCE",
        title: "Gallic campaigns",
        description: "Began a series of military campaigns in Gaul.",
      },
      {
        year: "49 BCE",
        title: "Crossing the Rubicon",
        description: "Crossed into Italy with his army, beginning a civil war.",
      },
      {
        year: "46 BCE",
        title: "Dictatorship",
        description: "Consolidated political power and pursued reforms.",
      },
      {
        year: "44 BCE",
        title: "Assassination",
        description: "Killed by conspirators on the Ides of March.",
      },
    ],
    legacy:
      "Caesar's political career played a crucial role in the end of the Roman Republic. His name became associated with later titles of political authority.",
    relatedEvent: "roman-empire",
  },

  {
    id: "subhas-chandra-bose",
    name: "Subhas Chandra Bose",
    shortName: "Subhas Chandra Bose",
    title: "Indian Independence Leader",
    category: "Leaders",
    born: "23 January 1897",
    died: "18 August 1945",
    birthplace: "Cuttack, Odisha, India",
    nationality: "Indian",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85",
    introduction:
      "Subhas Chandra Bose was an Indian nationalist leader who advocated a forceful struggle against British colonial rule. He is closely associated with the Indian National Army and the slogan 'Give me blood, and I shall give you freedom.'",
    biography: [
      "Subhas Chandra Bose was born in Cuttack in 1897. He became involved in India's independence movement and rose to prominence within the Indian National Congress.",
      "Bose differed with some Congress leaders over political strategy and the pace of the independence struggle. During the Second World War, he sought international support for an armed campaign against British rule.",
      "He became a leading figure associated with the Indian National Army and the Provisional Government of Free India. His final fate remains a subject of historical discussion, although his death is commonly dated to August 1945.",
    ],
    achievements: [
      {
        title: "Independence movement",
        description:
          "Became one of the most prominent nationalist leaders of his generation.",
      },
      {
        title: "Indian National Army",
        description: "Played a major role in organizing and leading the INA.",
      },
      {
        title: "Provisional Government",
        description:
          "Helped establish the Provisional Government of Free India in 1943.",
      },
      {
        title: "National legacy",
        description:
          "Remains an important and widely remembered figure in India's independence history.",
      },
    ],
    timeline: [
      {
        year: "1897",
        title: "Birth",
        description: "Born in Cuttack, Odisha.",
      },
      {
        year: "1920s",
        title: "Political rise",
        description:
          "Became increasingly involved in the Indian independence movement.",
      },
      {
        year: "1938",
        title: "Congress president",
        description: "Elected president of the Indian National Congress.",
      },
      {
        year: "1941",
        title: "Left India",
        description:
          "Departed India in an effort to seek international support.",
      },
      {
        year: "1943",
        title: "Indian National Army",
        description:
          "Assumed leadership of the INA and established a provisional government.",
      },
      {
        year: "1945",
        title: "Reported death",
        description:
          "His death is commonly dated to August 1945, though historical debate continues.",
      },
    ],
    legacy:
      "Bose's commitment to independence and his role in the Indian National Army continue to shape discussions of India's freedom struggle.",
    relatedEvent: "indian-independence",
  },
];

function getSavedPeople() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("histora-people-favorites") || "[]",
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function PersonDetails() {
  const { id } = useParams();

  const [savedPeople, setSavedPeople] = useState(getSavedPeople);
  const [copied, setCopied] = useState(false);
  const [showFullBiography, setShowFullBiography] = useState(false);

  const person = peopleData.find((item) => item.id === id);

  useEffect(() => {
    localStorage.setItem(
      "histora-people-favorites",
      JSON.stringify(savedPeople),
    );
  }, [savedPeople]);

  if (!person) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#101014] px-6 text-white">
        <div className="max-w-lg text-center">
          <Landmark className="mx-auto mb-5 h-14 w-14 text-[#e8bd73]" />
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#e8bd73]">
            Histora Archives
          </p>
          <h1 className="mb-4 text-3xl font-bold">Person Not Found</h1>
          <p className="mb-8 text-gray-400">
            We couldn't find this historical personality. Explore our collection
            to discover someone else.
          </p>
          <Link
            to="/people"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e8bd73] px-6 py-3 font-semibold text-black transition hover:bg-[#f2d49d]"
          >
            <ArrowLeft size={18} />
            Back to People
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = savedPeople.includes(person.id);

  const toggleBookmark = () => {
    setSavedPeople((previous) =>
      previous.includes(person.id)
        ? previous.filter((item) => item !== person.id)
        : [...previous, person.id],
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: person.name,
      text: `Discover the life and legacy of ${person.name} on Histora.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        window.prompt("Copy this page URL:", window.location.href);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        window.prompt("Copy this page URL:", window.location.href);
      }
    }
  };

  const visibleBiography = showFullBiography
    ? person.biography
    : person.biography.slice(0, 2);

  return (
    <div className="min-h-screen overflow-hidden bg-[#101014] text-white">
      {/* Hero section */}
      <section className="relative isolate min-h-[580px] overflow-hidden border-b border-white/10">
        <img
          src={person.image}
          alt={person.name}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101014] via-[#101014]/90 to-[#101014]/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101014] via-transparent to-black/30" />

        <div className="mx-auto flex min-h-[580px] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <Link
              to="/people"
              className="mb-10 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-[#e8bd73]"
            >
              <ArrowLeft size={17} />
              All Historical Personalities
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e8bd73]/30 bg-[#e8bd73]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e8bd73]">
                <Sparkles size={14} />
                {person.category}
              </span>

              <span className="text-sm text-gray-400">
                Historical Biography
              </span>
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              {person.name}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
              {person.title}
            </p>

            <p className="mt-5 max-w-2xl leading-8 text-gray-400">
              {person.introduction}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={toggleBookmark}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                  isSaved
                    ? "bg-[#e8bd73] text-black"
                    : "border border-white/20 bg-white/5 text-white hover:border-[#e8bd73] hover:text-[#e8bd73]"
                }`}
              >
                {isSaved ? <Check size={18} /> : <Bookmark size={18} />}
                {isSaved ? "Saved to Favorites" : "Save Biography"}
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-semibold transition hover:border-[#e8bd73] hover:text-[#e8bd73]"
              >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
                {copied ? "Link Copied" : "Share"}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8bd73]/50 to-transparent" />
      </section>

      {/* Quick facts */}
      <section className="relative z-10 mx-auto -mt-1 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#19191f] sm:grid-cols-2 lg:grid-cols-4">
          <FactCard icon={CalendarDays} label="Born" value={person.born} />
          <FactCard icon={Clock3} label="Died" value={person.died} />
          <FactCard
            icon={MapPin}
            label="Birthplace"
            value={person.birthplace}
          />
          <FactCard
            icon={Globe2}
            label="Nationality"
            value={person.nationality}
          />
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_330px]">
          <div>
            {/* Biography */}
            <section id="biography">
              <SectionHeading
                eyebrow="The Story"
                title="Biography"
                description="Explore the life, experiences, and historical significance of this personality."
              />

              <div className="mt-8 space-y-5">
                {visibleBiography.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-8 text-gray-300 sm:text-lg sm:leading-9"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {person.biography.length > 2 && (
                <button
                  onClick={() => setShowFullBiography((value) => !value)}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-[#e8bd73] transition hover:text-[#f5d69d]"
                >
                  {showFullBiography ? "Read Less" : "Read Full Biography"}
                  {showFullBiography ? (
                    <ArrowLeft size={17} />
                  ) : (
                    <ArrowRight size={17} />
                  )}
                </button>
              )}
            </section>

            {/* Achievements */}
            <section className="mt-20">
              <SectionHeading
                eyebrow="Major Contributions"
                title="Achievements & Contributions"
                description="Important accomplishments that shaped this person's historical legacy."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {person.achievements.map((achievement, index) => (
                  <div
                    key={achievement.title}
                    className="group rounded-2xl border border-white/10 bg-[#17171c] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#e8bd73]/40 hover:bg-[#1d1c20]"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#e8bd73]/20 bg-[#e8bd73]/10 text-[#e8bd73]">
                      {index === 0 ? (
                        <Crown size={21} />
                      ) : index === 1 ? (
                        <Landmark size={21} />
                      ) : index === 2 ? (
                        <BookOpen size={21} />
                      ) : (
                        <GraduationCap size={21} />
                      )}
                    </div>

                    <h3 className="mb-3 text-lg font-semibold transition group-hover:text-[#e8bd73]">
                      {achievement.title}
                    </h3>

                    <p className="text-sm leading-7 text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Life timeline */}
            <section className="mt-20">
              <SectionHeading
                eyebrow="A Life in Time"
                title="Life Timeline"
                description="Follow the major milestones in this historical figure's life."
              />

              <div className="relative mt-10">
                <div className="absolute bottom-4 left-[7px] top-4 w-px bg-gradient-to-b from-[#e8bd73] via-[#e8bd73]/40 to-transparent sm:left-[9px]" />

                <div className="space-y-8">
                  {person.timeline.map((item, index) => (
                    <div
                      key={`${item.year}-${item.title}`}
                      className="relative flex gap-5 sm:gap-7"
                    >
                      <div className="relative z-10 mt-1.5 h-4 w-4 shrink-0 rounded-full border-4 border-[#101014] bg-[#e8bd73] ring-1 ring-[#e8bd73]/40 sm:h-5 sm:w-5" />

                      <div className="flex-1 rounded-2xl border border-white/10 bg-[#17171c] p-5 sm:p-6">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span className="rounded-lg bg-[#e8bd73]/10 px-3 py-1.5 text-sm font-bold text-[#e8bd73]">
                            {item.year}
                          </span>

                          {index === 0 && (
                            <span className="text-xs uppercase tracking-wider text-gray-500">
                              Early Life
                            </span>
                          )}
                        </div>

                        <h3 className="mb-2 text-lg font-semibold">
                          {item.title}
                        </h3>

                        <p className="text-sm leading-7 text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Legacy */}
            <section className="mt-20">
              <SectionHeading
                eyebrow="Historical Impact"
                title="Legacy"
                description="How this personality continues to influence our understanding of history."
              />

              <div className="mt-8 rounded-2xl border border-[#e8bd73]/20 bg-gradient-to-br from-[#e8bd73]/10 via-[#17171c] to-[#17171c] p-7 sm:p-9">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8bd73]/15 text-[#e8bd73]">
                  <Sparkles size={23} />
                </div>

                <p className="text-base leading-8 text-gray-300 sm:text-lg">
                  {person.legacy}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#17171c] p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8bd73]/10 text-[#e8bd73]">
                  <Users size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Quick Overview</h2>
                  <p className="text-xs text-gray-500">Essential information</p>
                </div>
              </div>

              <div className="space-y-4">
                <OverviewRow label="Full Name" value={person.name} />
                <OverviewRow label="Known For" value={person.title} />
                <OverviewRow label="Category" value={person.category} />
                <OverviewRow label="Born" value={person.born} />
                <OverviewRow label="Died" value={person.died} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#17171c] p-6">
              <div className="mb-4 flex items-center gap-3">
                <BookOpen className="text-[#e8bd73]" size={21} />
                <h2 className="font-semibold">Explore More</h2>
              </div>

              <p className="mb-5 text-sm leading-7 text-gray-400">
                Discover the historical events connected to this personality.
              </p>

              <Link
                to={`/events/${person.relatedEvent}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#e8bd73]/40"
              >
                <span className="text-sm font-medium">
                  Related Historical Event
                </span>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-[#e8bd73] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="rounded-2xl border border-[#e8bd73]/20 bg-[#e8bd73]/[0.05] p-6">
              <Sparkles className="mb-4 text-[#e8bd73]" size={23} />

              <h2 className="mb-3 text-lg font-semibold">
                History Connects Us
              </h2>

              <p className="mb-5 text-sm leading-7 text-gray-400">
                Every personality is part of a larger historical story. Explore
                events and discover the connections between people and
                civilizations.
              </p>

              <Link
                to="/connections"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8bd73] transition hover:text-[#f5d69d]"
              >
                Explore Connections
                <ArrowRight size={16} />
              </Link>
            </div>

            <Link
              to="/people"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-4 text-sm font-semibold text-gray-300 transition hover:border-[#e8bd73]/40 hover:text-[#e8bd73]"
            >
              <ArrowLeft size={17} />
              Back to All People
            </Link>
          </aside>
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="border-t border-white/10 bg-[#151519]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#e8bd73]">
              Continue Exploring
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Discover another chapter of history.
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Explore historical events, people, and the connections between
              them.
            </p>
          </div>

          <Link
            to="/people"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#e8bd73] px-6 py-3.5 font-semibold text-black transition hover:bg-[#f2d49d]"
          >
            Explore People
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FactCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4 border-b border-white/10 p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 lg:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8bd73]/10 text-[#e8bd73]">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <p className="mb-1 text-xs uppercase tracking-wider text-gray-500">
          {label}
        </p>
        <p className="break-words text-sm font-semibold text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#e8bd73]">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function OverviewRow({ label, value }) {
  return (
    <div className="border-b border-white/[0.07] pb-3 last:border-0 last:pb-0">
      <p className="mb-1 text-xs uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="break-words text-sm leading-6 text-gray-200">{value}</p>
    </div>
  );
}
