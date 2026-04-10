/** Chemins publics des photos DB FIT (`public/db-photos/`), tri numérique. */
export const GALLERY_IMAGE_PATHS = [
  "/db-photos/image00001.webp",
  "/db-photos/image00002.webp",
  "/db-photos/image00004.webp",
  "/db-photos/image00005.webp",
  "/db-photos/image00006.webp",
  "/db-photos/image00010.webp",
  "/db-photos/image00011.webp",
  "/db-photos/image00012.webp",
  "/db-photos/image00014.webp",
  "/db-photos/image00015.webp",
  "/db-photos/image00016.webp",
  "/db-photos/image00017.webp",
  "/db-photos/image00018.webp",
  "/db-photos/image00020.webp",
  "/db-photos/image00021.webp",
  "/db-photos/image00022.webp",
  "/db-photos/image00023.webp",
  "/db-photos/image00024.webp",
  "/db-photos/image00025.webp",
  "/db-photos/image00028.webp",
  "/db-photos/image00030.webp",
] as const;

export type GalleryImagePath = (typeof GALLERY_IMAGE_PATHS)[number];
