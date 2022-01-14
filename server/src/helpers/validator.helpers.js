export const isValidEmail = (email) => {
	const regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
	if (regex.test(email)) {
		return true;
	}
	return false;
};
