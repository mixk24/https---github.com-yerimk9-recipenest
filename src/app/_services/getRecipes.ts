async function getRecipes() {
  const res = await fetch(
    `https://openapi.foodsafetykorea.go.kr/api/${process.env.FOOD_RECIPE_API_KEY}/COOKRCP01/json/15/50`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default getRecipes;
