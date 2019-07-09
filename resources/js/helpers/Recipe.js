export function getAverageRating(ratings) {
    const total = ratings.reduce((acc, cur) => parseInt(acc) + parseInt(cur.rating), 0);
    return total / ratings.length;
}