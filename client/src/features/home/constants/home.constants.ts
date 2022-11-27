export enum SLUG_TOPICS {
  LIFE = 'life',
  NATURE = 'nature',
  ANIMAL = 'animal',
  SPORT = 'sport',
  FAVORITE = 'favorite',
}

export const TOPIC_TAB: { label: string; slug: string }[] = [
  {
    label: 'Thiên nhiên',
    slug: 'nature',
  },
  {
    label: 'Động vật',
    slug: 'animal',
  },
  {
    label: 'Thể thao',
    slug: 'sport',
  },
];

export enum DEFAULT_PAGINATION {
  PAGE = 1,
  PER_PAGE = 5,
}
