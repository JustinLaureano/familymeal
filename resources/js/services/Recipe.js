export function getAverageRating(ratings) {
    if (ratings.length == 0) {
        return 0;
    }

    const total = ratings.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.rating), 0);
    return total / ratings.length;
}


export function getUserRating(ratings, user_id) {
    if (ratings.length == 0) {
        return 0;
    }

    const rating = ratings.filter(rating => {
        return rating.user_id == user_id;
    });
    return rating[0];
}


export function arrayMove(arr, curIndex, toIndex) {
    var clone = arr.slice(0);
    var element = clone[curIndex];
    clone.splice(curIndex, 1);
    clone.splice(toIndex, 0, element);
    return clone;
}

