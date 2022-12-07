export const pagination = (req) => {
	const page = Number(req.query.page) * 1 || 1;
	const perPage = Number(req.query.per_page) * 1 || 1;
	const skip = (page - 1) * perPage;

	return { page, perPage, skip };
};

export class ApiFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	pagination() {
		const page = Number(this.queryString.page) || 1;
		const perPage = Number(this.queryString.per_page) || 2;
		const skip = perPage * (page - 1);
		this.query = this.query.limit(perPage).skip(skip);
		return this;
	}

	sorting() {
		const sort = this.queryString.sort || "-createdAt";
		this.query = this.query.sort(sort);
		return this;
	}
}

export const convertsQuery = (req) => {
	const sort = req.query.sort;
	const flagSort = sort.charAt(0);
	const fieldSort = flagSort === "-" ? sort.slice(1) : sort;
	const valueSort = flagSort === "-" ? -1 : 1;
	return { [fieldSort]: valueSort };
};
