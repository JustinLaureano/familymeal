export function getRecipeCountByCategory() {
    return new Promise((resolve, reject) => {
        const token = document.querySelector('meta[name="api-token"]').content;
        const csrf_token = document.querySelector('meta[name="csrf-token"]').content;
        const user_id = document.querySelector('meta[name="user_id"]').content;

        const request = {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'X-CSRF-TOKEN': csrf_token
			},
		};

		fetch('/api/recipes/count/categories/' + user_id, request)
			.then(resp => resp.json())
			.then((data) => resolve(data.totals))
			.catch(err => reject(err));
    });
}