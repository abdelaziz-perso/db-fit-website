/** Photos (Unsplash) + réseaux par coach — aligné sur l’ordre des entrées i18n. */
export type CoachMediaEntry = {
  image: string;
  instagram?: string;
  facebook?: string;
};

export const COACH_MEDIA: readonly CoachMediaEntry[] = [
  {
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=640&h=800&fit=crop&q=80&auto=format",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=640&h=800&fit=crop&q=80&auto=format",
    instagram: "https://www.instagram.com/rajalidali/",
    facebook: "https://www.facebook.com/rajaa.lidali/",
  },
] as const;
