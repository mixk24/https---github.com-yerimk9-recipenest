"use client";
import React, { useEffect } from "react";
import createLoopingText from "../_utils/loopingTextAnimation";

export default function InfiniteTextFlow() {
  useEffect(() => {
    createLoopingText(document.querySelector(".loop-container"));
  }, []);

  return (
    <section className="hero-section">
      <div className="loop-container">
        <div className="item">Delicious Recipes Await You!&nbsp;</div>
        <div className="item">Discover, Cook, Enjoy!&nbsp;</div>
      </div>
    </section>
  );
}
