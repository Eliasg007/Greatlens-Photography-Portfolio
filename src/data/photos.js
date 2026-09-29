/**
 * Photo registry for the GREATLENS portfolio.
 *
 * To add a photo:
 *   1. Drop the file into public/photos/
 *   2. Find the matching record below by id
 *   3. Update `src` to "/photos/your-filename.jpg"
 *   4. Update `alt` with a real description
 *   5. Remove `pending: true`
 *
 * See PHOTOS.md for full instructions.
 */

const PLACEHOLDER = "/photos/placeholder.svg";

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

export const heroPhoto = {
  id: "hero",
  src: "/photos/eli-78.jpg",
  alt: "Featured photograph",
};

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export const aboutPhoto = {
  id: "about",
  src: "/photos/ppoe.jpg",
  alt: "Portrait of the photographer",
};

/* ------------------------------------------------------------------ */
/* Work — 12 portfolio items                                            */
/* ------------------------------------------------------------------ */

export const workPhotos = [
  { id: "work-01", category: "Portraits",   title: "Amara, Studio Light",       src: PLACEHOLDER, alt: "Amara, Studio Light",       ratio: "portrait",  pending: true },
  { id: "work-02", category: "Documentary", title: "Morning Market, Lagos",     src: PLACEHOLDER, alt: "Morning Market, Lagos",     ratio: "landscape", pending: true },
  { id: "work-03", category: "Events",      title: "The Adeyemi Wedding",       src: PLACEHOLDER, alt: "The Adeyemi Wedding",       ratio: "landscape", pending: true },
  { id: "work-04", category: "Faith",       title: "Sunday, First Light",       src: PLACEHOLDER, alt: "Sunday, First Light",       ratio: "portrait",  pending: true },
  { id: "work-05", category: "Commercial",  title: "Aso-Oke Textiles",          src: PLACEHOLDER, alt: "Aso-Oke Textiles",          ratio: "square",    pending: true },
  { id: "work-06", category: "Portraits",   title: "David, Backstage",          src: PLACEHOLDER, alt: "David, Backstage",          ratio: "portrait",  pending: true },
  { id: "work-07", category: "Documentary", title: "Fishermen, Badagry",        src: PLACEHOLDER, alt: "Fishermen, Badagry",        ratio: "landscape", pending: true },
  { id: "work-08", category: "Faith",       title: "Baptism, River Road",       src: PLACEHOLDER, alt: "Baptism, River Road",       ratio: "landscape", pending: true },
  { id: "work-09", category: "Events",      title: "Convocation Day",           src: PLACEHOLDER, alt: "Convocation Day",           ratio: "square",    pending: true },
  { id: "work-10", category: "Commercial",  title: "Néné Skincare Campaign",    src: PLACEHOLDER, alt: "Néné Skincare Campaign",    ratio: "portrait",  pending: true },
  { id: "work-11", category: "Portraits",   title: "Chidi, Window Light",       src: PLACEHOLDER, alt: "Chidi, Window Light",       ratio: "square",    pending: true },
  { id: "work-12", category: "Documentary", title: "Bus Stop, Rainy Season",    src: PLACEHOLDER, alt: "Bus Stop, Rainy Season",    ratio: "landscape", pending: true },
];

/* ------------------------------------------------------------------ */
/* Stories — 3 long-form projects                                       */
/* ------------------------------------------------------------------ */

export const storyPhotos = [
  { id: "story-01", title: "Between Services",      src: PLACEHOLDER, alt: "Between Services",      pending: true },
  { id: "story-02", title: "Okada",                 src: PLACEHOLDER, alt: "Okada",                 pending: true },
  { id: "story-03", title: "What the Market Keeps",  src: PLACEHOLDER, alt: "What the Market Keeps",  pending: true },
];

/* ------------------------------------------------------------------ */
/* Journal (365) — 24 slots                                             */
/* ------------------------------------------------------------------ */

export const journalPhotos = Array.from({ length: 24 }, (_, i) => ({
  id: `journal-${String(i + 1).padStart(2, "0")}`,
  src: PLACEHOLDER,
  alt: "",
  pending: true,
}));

/* ------------------------------------------------------------------ */
/* Lookup helper                                                        */
/* ------------------------------------------------------------------ */

const _index = new Map();

function _buildIndex() {
  const all = [
    heroPhoto,
    aboutPhoto,
    ...workPhotos,
    ...storyPhotos,
    ...journalPhotos,
  ];
  for (const photo of all) {
    _index.set(photo.id, photo);
  }
}

_buildIndex();

/**
 * Look up a photo record by id.
 * Returns the matching record, or a placeholder object with a console warning.
 */
export function img(id) {
  const photo = _index.get(id);
  if (!photo) {
    console.warn(`[GREATLENS] Unknown photo id: "${id}" — using placeholder.`);
    return { id, src: PLACEHOLDER, alt: "", pending: true };
  }
  return photo;
}
