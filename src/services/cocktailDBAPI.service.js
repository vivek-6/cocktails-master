import compact from "lodash/compact";
import trim from "lodash/trim";

export async function fetchCocktailEnrichment(cocktail) {
  const cocktailName = cocktail.name;

  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail.searchTerm ||
      cocktailName}`
  );
  const { drinks } = await response.json();

  if (!drinks) return {};

  const mainDrink =
    drinks.find(d => d.strDrink.toLowerCase() === cocktailName.toLowerCase()) ||
    drinks[0];

  const variants = drinks
    .filter(d => d.strDrink.toLowerCase() !== cocktailName.toLowerCase())
    .map(d => {
      const ingredients = [];
      for (let i = 1; i < 16; i++) {
        const name = d[`strIngredient${i}`] || "";
        const measure = d[`strMeasure${i}`] || "";
        ingredients.push(trim(measure + name));
      }
      return {
        name: `${d.strDrink}`,
        image: d.strDrinkThumb,
        category: d.strDrinkCategory,
        glass: d.strDrinkGlass,
        preparation: d.strInstructions,
        ingredients: compact(ingredients)
      };
    });

  return {
    image: mainDrink.strDrinkThumb,
    ibaCategory: mainDrink.strIBA,
    variants
  };
}
