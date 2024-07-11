async function getRecipe(menuName) {
  const res = await fetch(
    `http://openapi.foodsafetykorea.go.kr/api/${process.env.FOOD_RECIPE_API_KEY}/COOKRCP01/json/1/35/RCP_NM=${menuName}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default getRecipe;
