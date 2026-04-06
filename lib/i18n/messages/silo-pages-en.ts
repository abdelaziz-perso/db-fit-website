import type { SiloPages } from "@/lib/i18n/types-silo";
import { siloRelatedEnExcluding } from "./silo-related-en";
import { localizeSiloPages } from "./silo-localize";
import { siloPagesFr } from "./silo-pages-fr";

const EN_HEADS: Record<
  keyof SiloPages,
  { metaTitle: string; metaDescription: string; h1: string }
> = {
  gymDarBouazza: {
    metaTitle: "Gym in Dar Bouazza | DB FIT – Premium Sports Club",
    metaDescription:
      "DB FIT, sports club in Dar Bouazza (Ansari). Women’s, men’s & mixed areas. Coaching, modern equipment. Open 7 days. Join us!",
    h1: "Gym in Dar Bouazza – DB FIT",
  },
  salleDeSportDarBouazza: {
    metaTitle: "Sports club Dar Bouazza | DB FIT – Ansari (Casablanca)",
    metaDescription:
      "Sports club in Dar Bouazza (Ansari): women, men, mixed, coaching, modern kit. Near Tamaris. Open 7/7 — WhatsApp DB FIT.",
    h1: "Sports club Dar Bouazza — DB FIT",
  },
  fitnessDarBouazza: {
    metaTitle: "Fitness Dar Bouazza & Casablanca | DB FIT",
    metaDescription:
      "Fitness in Dar Bouazza & Casablanca: cardio, strength, cross training at DB FIT Ansari. Open 7/7.",
    h1: "Fitness Dar Bouazza — DB FIT",
  },
  coachingSportifDarBouazza: {
    metaTitle: "Personal coaching Dar Bouazza & strength plans | DB FIT",
    metaDescription:
      "Sports coaching in Dar Bouazza: custom programming, technique, motivation. West Casablanca coaching at Ansari. WhatsApp.",
    h1: "Personal coaching Dar Bouazza",
  },
  salleFemmesDarBouazza: {
    metaTitle: "Women’s gym Dar Bouazza | DB FIT — Ansari",
    metaDescription:
      "Women’s gym Dar Bouazza: dedicated hours, privacy, coaching at DB FIT Ansari. Near Tamaris & Casablanca.",
    h1: "Women’s gym Dar Bouazza",
  },
  fitnessMixteDarBouazza: {
    metaTitle: "Mixed gym Casablanca & mixed training Dar Bouazza | DB FIT",
    metaDescription:
      "Mixed gym near Casablanca: cardio, strength, functional training at DB FIT Dar Bouazza (Ansari). Premium vibe, 7/7.",
    h1: "Mixed gym & mixed training Dar Bouazza",
  },
  salleHommesDarBouazza: {
    metaTitle: "Men’s gym Dar Bouazza | DB FIT — Ansari",
    metaDescription:
      "Men’s gym Dar Bouazza: strength, cardio, dedicated hours at DB FIT. Near Tamaris. Open 7/7.",
    h1: "Men’s gym Dar Bouazza",
  },
  abonnementGymDarBouazza: {
    metaTitle: "Gym membership Dar Bouazza & pricing | DB FIT",
    metaDescription:
      "Gym membership Dar Bouazza, sports-club pricing, offers & signup: WhatsApp DB FIT (Ansari) for up-to-date rates.",
    h1: "Gym membership Dar Bouazza — pricing & signup",
  },
  programmeMusculationDebutant: {
    metaTitle: "Beginner strength programme | DB FIT Dar Bouazza",
    metaDescription:
      "Beginner strength training: basics, frequency, key lifts, mistakes to avoid. DB FIT Dar Bouazza — coaching on request.",
    h1: "Beginner strength programme",
  },
  perdrePoidsRapidement: {
    metaTitle: "Lose weight fast (safely) | DB FIT Dar Bouazza",
    metaDescription:
      "Lose weight fast without crashing: deficit, steps, strength training, sleep. Practical tips + DB FIT gym in Dar Bouazza.",
    h1: "Lose weight fast — what actually works",
  },
  exercicesSalleDeSport: {
    metaTitle: "Gym exercises: basics & safety | DB FIT Dar Bouazza",
    metaDescription:
      "Gym exercises: essential patterns, common mistakes, and how to progress at DB FIT Dar Bouazza (Ansari).",
    h1: "Gym exercises — progress with good form",
  },
  salleSportTamaris: {
    metaTitle: "Gym near Tamaris | DB FIT Dar Bouazza",
    metaDescription:
      "Gym near Tamaris: DB FIT in Ansari, Dar Bouazza — modern equipment, coaching, 7/7. WhatsApp.",
    h1: "Gym near Tamaris — DB FIT",
  },
  gymCasablancaOuest: {
    metaTitle: "West Casablanca gym | DB FIT Dar Bouazza",
    metaDescription:
      "West Casablanca gym: DB FIT Dar Bouazza (Ansari) — strength, cardio, coaching. Ideal west Casa / Tamaris. 7/7.",
    h1: "West Casablanca gym — DB FIT Dar Bouazza",
  },
};

const baseEn = localizeSiloPages(
  siloPagesFr,
  EN_HEADS,
  siloRelatedEnExcluding,
);

export const siloPagesEn: SiloPages = {
  ...baseEn,
  gymDarBouazza: {
    ...baseEn.gymDarBouazza,
    lead: [
      "Welcome to DB FIT: a Dar Bouazza gym built for performance, comfort, and everyday life. Whether you live in Ansari, Tamaris, or commute from Casablanca, our club brings strength training, cardio, cross training, and coaching together on one modern training floor.",
      "Our promise is simple: deliver the best sports-club experience in Dar Bouazza with clear schedules (women, men, mixed), equipment maintained daily, and coaches on the floor to correct, motivate, and keep every session safe.",
    ],
    sections: [
      {
        h2: "The best sports club in Dar Bouazza",
        paragraphs: [
          "When people search for a sports club in Dar Bouazza, they want three things: easy access, a serious environment, and visible progress. DB FIT is located in Ansari — close to Tamaris and well connected to west Casablanca. Less travel means more consistency, and consistency is the #1 driver of transformation.",
          "Our edge is not “more machines only”: it’s premium atmosphere, structured onboarding, clearly defined training zones, and a culture of respect (noise, reracking, hygiene). A Dar Bouazza gym must feel comfortable for beginners returning after a break — and demanding enough for advanced athletes.",
          "Equipment-wise, DB FIT is full-stack: dumbbells and racks, guided machines, modern cardio, a functional area for cross training, and accessories for core and conditioning. Zones are laid out for smooth circulation, shorter waits at peak hours, and efficient sessions.",
          "The vibe is energetic and motivating — without gimmicks. Lighting, sound, and design support a true fitness-club feel while keeping the warmth of a neighbourhood gym. That mix is why DB FIT is a local reference for fitness around Dar Bouazza and Casablanca west.",
          "Finally, we connect training to outcomes — fat loss, muscle gain, performance, wellbeing — with concrete guidance on load, technique, recovery, sleep, and general nutrition habits. No miracle promises in two weeks: sustainable, safe progression.",
        ],
      },
      {
        h2: "Spaces for everyone",
        paragraphs: [
          "A serious Dar Bouazza gym must respect every member. DB FIT runs women-only hours, men-only hours, and mixed windows — so you always know when to come, where to train, and what level of privacy to expect.",
        ],
        subsections: [
          {
            h3: "Women’s area",
            paragraphs: [
              "Dedicated women’s hours provide a calm, confident training environment: coaching available, full equipment, and a respectful culture. See our women’s gym page for schedules and details.",
            ],
          },
          {
            h3: "Men’s area",
            paragraphs: [
              "The men’s zone focuses on strength, cardio, and focus: racks, dumbbells, machines, and room for intense sessions.",
            ],
          },
          {
            h3: "Mixed area",
            paragraphs: [
              "The mixed floor is the collective heart: circuits, functional work, and group energy — perfect if you like variety and motivation.",
            ],
          },
        ],
      },
      {
        h2: "Personal coaching",
        paragraphs: [
          "Coaching at DB FIT is more than a printed sheet: we look at execution, adjust loads, explain the “why”, and help you stay consistent. Combine coaching with independent training for faster, safer progress.",
          "Explore our coaching page for formats and availability — and link it with your membership questions on the pricing page.",
        ],
      },
      {
        h2: "Why choose DB FIT?",
        paragraphs: [
          "Modern equipment maintained daily — a premium gym is mostly maintenance and smart floor management.",
          "Community & vibe: respectful, motivating, rules that protect everyone’s experience.",
          "Results come from consistency: clear standards, human support, and proof through member reviews and WhatsApp referrals.",
        ],
      },
      {
        h2: "Membership & pricing",
        paragraphs: [
          "Wondering about sports-club pricing in Dar Bouazza? Rates depend on commitment length, coaching options, and promotions. WhatsApp us for a current, transparent quote.",
          "For membership options, visit our dedicated membership page — then message us to confirm your trial.",
        ],
      },
    ],
    faqSectionTitle: "FAQ",
    faq: [
      {
        question: "How much does a gym cost in Dar Bouazza?",
        answer:
          "It depends on your plan (length, coaching add-ons, promotions). Message DB FIT on WhatsApp for a clear, up-to-date quote tailored to your goal.",
      },
      {
        question: "Is DB FIT open every day?",
        answer:
          "Yes — 7/7. Check the homepage schedule for women / men / mixed hours.",
      },
      {
        question: "Is there a women-only space?",
        answer:
          "Yes. DB FIT offers dedicated women’s hours. See the women’s gym page for details.",
      },
      {
        question: "Do you offer a trial or a tour?",
        answer:
          "Yes, depending on availability. WhatsApp us with your preferred time slot.",
      },
      {
        question: "Is DB FIT beginner-friendly?",
        answer:
          "Yes. We recommend starting with coaching to learn technique, breathing, and loading. Then you can train more independently with safety nets.",
      },
    ],
    cta: "WhatsApp — fast reply",
    waMessage:
      "Hi DB FIT, I’m on the gym Dar Bouazza page. Can you share trial + pricing info?",
  },
};
