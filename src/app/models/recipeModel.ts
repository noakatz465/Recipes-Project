export default class RecipeModel {
  _id: string;
  categoryId: string;
  categoryName: string; // Added category name
  description: string;
  mealName: string;
  img: string;
  instructions: string;
  isFavorite: boolean;
  ingredients: string[];

  constructor({
    _id,
    categoryId,
    categoryName,
    description,
    mealName,
    img,
    instructions,
    isFavorite = false,
    ingredients,
  }: {
    _id: string;
    categoryId: string;
    categoryName: string; // Accept category name
    description: string;
    mealName: string;
    img: string;
    instructions: string;
    isFavorite?: boolean;
    ingredients: string[];
  }) {
    this._id = _id;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.description = description;
    this.mealName = mealName;
    this.img = img;
    this.instructions = instructions;
    this.isFavorite = isFavorite;
    this.ingredients = ingredients;
  }
}
