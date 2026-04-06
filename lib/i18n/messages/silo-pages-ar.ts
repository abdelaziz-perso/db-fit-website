import type { SiloPages } from "@/lib/i18n/types-silo";
import { siloRelatedArExcluding } from "./silo-related-ar";
import { localizeSiloPages } from "./silo-localize";
import { siloPagesFr } from "./silo-pages-fr";

const AR_HEADS: Record<
  keyof SiloPages,
  { metaTitle: string; metaDescription: string; h1: string }
> = {
  gymDarBouazza: {
    metaTitle: "جيم دار بوعزة | DB FIT – صالة رياضية فاخرة",
    metaDescription:
      "DB FIT، صالة رياضية في دار بوعزة (أنصاري). أقسام نساء ورجال ومختلط. تدريب، معدات حديثة. مفتوح 7/7. انضم إلينا!",
    h1: "جيم دار بوعزة – DB FIT",
  },
  salleDeSportDarBouazza: {
    metaTitle: "صالة رياضية دار بوعزة | DB FIT – أنصاري (كازابلانكا)",
    metaDescription:
      "صالة رياضية في دار بوعزة (أنصاري): نساء، رجال، مختلط، تدريب، معدات حديثة. قرب تماريس. 7/7 — واتساب DB FIT.",
    h1: "صالة رياضية دار بوعزة — DB FIT",
  },
  fitnessDarBouazza: {
    metaTitle: "لياقة دار بوعزة وكازابلانكا | DB FIT",
    metaDescription:
      "لياقة في دار بوعزة وكازابلانكا: كارديو، حديد، تدريب متنوع في DB FIT أنصاري. 7/7.",
    h1: "لياقة دار بوعزة — DB FIT",
  },
  coachingSportifDarBouazza: {
    metaTitle: "تدريب رياضي دار بوعزة وبرنامج حديد | DB FIT",
    metaDescription:
      "تدريب رياضي في دار بوعزة: برنامج مخصص، تقنية وتحفيز. DB FIT أنصاري. واتساب.",
    h1: "تدريب رياضي في دار بوعزة",
  },
  salleFemmesDarBouazza: {
    metaTitle: "صالة نساء دار بوعزة | DB FIT — أنصاري",
    metaDescription:
      "صالة رياضية للنساء في دار بوعزة: أوقات مخصصة وخصوصية وتدريب في DB FIT أنصاري. قرب تماريس وكازابلانكا.",
    h1: "صالة رياضية نساء دار بوعزة",
  },
  fitnessMixteDarBouazza: {
    metaTitle: "صالة مختلطة كازابلانكا ولياقة مختلطة دار بوعزة | DB FIT",
    metaDescription:
      "صالة رياضية مختلطة قرب كازابلانكا: كارديو، حديد، تدريب وظيفي في DB FIT دار بوعزة (أنصاري). 7/7.",
    h1: "صالة مختلطة ولياقة مختلطة دار بوعزة",
  },
  salleHommesDarBouazza: {
    metaTitle: "صالة رجال دار بوعزة | DB FIT — أنصاري",
    metaDescription:
      "صالة رجال في دار بوعزة: حديد، كارديو، أوقات مخصصة في DB FIT. قرب تماريس. 7/7.",
    h1: "صالة رجال دار بوعزة",
  },
  abonnementGymDarBouazza: {
    metaTitle: "اشتراك جيم دار بوعزة وأسعار الصالة | DB FIT",
    metaDescription:
      "اشتراك جيم دار بوعزة، أسعار الصالة، عروض وتسجيل: راسل DB FIT (أنصاري) على واتساب لعرض محدث.",
    h1: "اشتراك جيم دار بوعزة — أسعار وتسجيل",
  },
  programmeMusculationDebutant: {
    metaTitle: "برنامج كمال أجسام للمبتدئين | DB FIT دار بوعزة",
    metaDescription:
      "برنامج حديد للمبتدئين: أساسيات، تكرار، تمارين، أخطاء شائعة. DB FIT دار بوعزة — تدريب عند الطلب.",
    h1: "برنامج كمال أجسام للمبتدئين",
  },
  perdrePoidsRapidement: {
    metaTitle: "فقدان الوزن بسرعة (بأمان) | DB FIT دار بوعزة",
    metaDescription:
      "فقدان الوزن بسرعة دون تدمير التمثيل: عجز معتدل، مشي، حديد، نوم. نصائح + صالة DB FIT.",
    h1: "فقدان الوزن بسرعة — ما الذي يعمل فعلاً",
  },
  exercicesSalleDeSport: {
    metaTitle: "تمارين الصالة الرياضية: أساسيات وأمان | DB FIT",
    metaDescription:
      "تمارين في الصالة: أنماط أساسية، أخطاء شائعة، وتقدم في DB FIT دار بوعزة (أنصاري).",
    h1: "تمارين الصالة الرياضية — تقدم بتقنية سليمة",
  },
  salleSportTamaris: {
    metaTitle: "صالة رياضية قرب تماريس | DB FIT دار بوعزة",
    metaDescription:
      "صالة قرب تماريس: DB FIT في أنصاري، دار بوعزة — معدات حديثة، تدريب، 7/7. واتساب.",
    h1: "صالة رياضية قرب تماريس — DB FIT",
  },
  gymCasablancaOuest: {
    metaTitle: "جيم غرب كازابلانكا | DB FIT دار بوعزة",
    metaDescription:
      "جيم غرب كازابلانكا: DB FIT دار بوعزة (أنصاري) — حديد، كارديو، تدريب. مناسب لغرب المدينة وتماريس. 7/7.",
    h1: "جيم غرب كازابلانكا — DB FIT دار بوعزة",
  },
};

export const siloPagesAr: SiloPages = localizeSiloPages(
  siloPagesFr,
  AR_HEADS,
  siloRelatedArExcluding,
);
