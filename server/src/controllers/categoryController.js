import Category from "../models/categoryModel";

export const postCategory = async (req, res) => {
	try {
		const newCategory = new Category(req.body);
		await newCategory.save();

		return res.status(200).json({ category: newCategory });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getCategories = async (req, res) => {
	try {
		const listCategory = await Category.find();
		return res.status(200).json({ listCategory });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
