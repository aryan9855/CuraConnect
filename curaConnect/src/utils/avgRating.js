export default function GetAvgRating(ratingArr) {
  if (!Array.isArray(ratingArr) || ratingArr.length === 0) {
    return 0;
  }

  const total = ratingArr.reduce((acc, curr) => {
    const value = Number(curr?.rating);
    return acc + (isNaN(value) ? 0 : value);
  }, 0);

  const avg = total / ratingArr.length;

  if (isNaN(avg)) return 0;

  return Math.round(avg * 10) / 10; // 1 decimal precision
}
