"use client";
import React from "react";
import Image from "next/image";

function RecipeContainer({ recipe }) {
  const manualImgs = Object.keys(recipe[0]).filter(
    (key) => key.startsWith("MANUAL_IMG") && recipe[0][key]
  );
  const manualData = manualImgs.map((imgKey) => {
    const manualKey = imgKey.replace("_IMG", "");
    return {
      imgKey: imgKey,
      imgValue: recipe[0][imgKey],
      manualKey: manualKey,
      manualValue: recipe[0][manualKey],
    };
  });

  // 객체 배열을 순서대로 정렬
  manualData.sort((a, b) => {
    const numA = parseInt(a.imgKey.match(/\d+/)?.[0] || "0", 10);
    const numB = parseInt(b.imgKey.match(/\d+/)?.[0] || "0", 10);
    return numA - numB;
  });

  console.log(manualData);

  return (
    <div className="recipeItem-container">
      {manualData.map((item, index) => (
        <div key={index} className="recipe-item">
          {item.imgKey && (
            <Image
              src={item.imgValue}
              alt="img"
              width={460}
              height={400}
            />
          )}
          {item.manualKey && <div className="recipe-item-desc">{item.manualValue}</div>}
        </div>
      ))}
    </div>
  );
}


export default RecipeContainer;
