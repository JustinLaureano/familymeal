export function getAverageRating(ratings) {
    const total = ratings.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.rating), 0);
    return total / ratings.length;
}