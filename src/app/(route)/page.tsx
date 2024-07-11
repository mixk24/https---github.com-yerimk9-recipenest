import React from "react";
import CardCarousel from "../_components/CardCarousel";
import getRecipes from "../_services/getRecipes";

async function Home() {
  const { COOKRCP01 } = await getRecipes();
  console.log(COOKRCP01);

  return (
    <div>
      <CardCarousel recipes={COOKRCP01["row"]} />
    </div>
  );
}

export default Home;
