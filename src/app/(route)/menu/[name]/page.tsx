import InfiniteTextFlow from "@/app/_components/InfiniteTextFlow";
import RecipeContainer from "@/app/_components/RecipeContainer";
import getRecipe from "@/app/_services/getRecipe";
import Image from "next/image";
import React from "react";

async function RecipeMenu({ params }) {
  const { COOKRCP01 } = await getRecipe(params.name);
  const recipe = COOKRCP01["row"];

  return (
    <div className="recopeMenu-contianer">
      <InfiniteTextFlow />
      <div className="menuDesc-container">
        <div className="menu-desc">
          <div>{recipe[0]["RCP_NM"]}</div>
          <div>{recipe[0]["RCP_NA_TIP"]}</div>
          <div>{recipe[0]["RCP_PARTS_DTLS"]}</div>
        </div>
        <Image
          src={recipe[0]["ATT_FILE_NO_MK"]}
          alt="img"
          width={460}
          height={600}
        />
      </div>

      <RecipeContainer recipe={recipe} />
    </div>
  );
}

export default RecipeMenu;
