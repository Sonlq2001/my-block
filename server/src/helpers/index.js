export const pagination = (req) => {
	const page = Number(req.query.page) * 1 || 1;
	const limit = Number(req.query.limit) * 1 || 5;
	const skip = (page - 1) * limit;

	return { page, limit, skip };
};
