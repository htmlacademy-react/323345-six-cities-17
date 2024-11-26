const MAX_STAR = 5;

export function getPercentFromRating(rating: number) {
  return Math.round(rating * 100 / MAX_STAR);
}
