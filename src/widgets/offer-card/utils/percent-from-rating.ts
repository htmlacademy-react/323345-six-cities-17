const MAX_STAR = 5;

export function getPercentFromRating(rating: number | undefined = 0) {
  return Math.round((rating * 100) / MAX_STAR);
}
