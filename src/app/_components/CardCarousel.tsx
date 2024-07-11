"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import updateCenterCard from "../_utils/centerCardUpdate";
import { wrapBackward, wrapForward } from "../_utils/galleryAnimationControls";
import buildSeamlessLoop from "../_utils/seamlessLoopAnimation";
import InfiniteTextFlow from "./InfiniteTextFlow";
import Link from "next/link";
import Image from "next/image";

export default function CardCarousel({ recipes }) {
  const cardsRef = useRef([]);
   const [currentCardNum, setCurrentCardNum] = useState(0);
  let iteration = 0;
  const spacing = 0.1;

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (recipes.length === 0) return;

    const cards = cardsRef.current;
    const seamlessLoop = buildSeamlessLoop(cards, spacing);

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
          wrapForward(self, iteration);
        } else if (
          self.progress < 1e-5 &&
          self.direction < 0 &&
          !self.wrapping
        ) {
          wrapBackward(self, iteration);
        } else {
          seamlessLoop.progress((iteration + self.progress) % 1);
          self.wrapping = false;
        }
        updateCenterCard(cards);
      },
      end: "+=50000",
      pin: ".gallery",
    });

    function startAutoPlay() {
      seamlessLoop.timeScale(0.03).play();
    }

    function stopAutoPlay() {
      seamlessLoop.pause();
    }

    startAutoPlay();

    cards.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", stopAutoPlay);
        card.addEventListener("mouseleave", startAutoPlay);
      }
    });

    console.log(cards);
    const updateInterval = setInterval(() => {
      updateCenterCard(cards);
      updateCurrentCardNum();
    }, 100);

      const updateCurrentCardNum = () => {
      const centerCard = document.querySelector(".center-card");
      if (centerCard) {
        const index = cardsRef.current.indexOf(centerCard);
        setCurrentCardNum(index >= 0 ? index : 0);
      }
    };

    return () => {
      trigger.kill();
      stopAutoPlay();
      clearInterval(updateInterval);
      cards.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", stopAutoPlay);
          card.removeEventListener("mouseleave", startAutoPlay);
        }
      });
    };
  }, [recipes]);

  return (
    <div className="gallery">
      <InfiniteTextFlow />
      <div className="container">
        <ul className="cards">
          {recipes.map((item, idx) => (
            <li key={idx} ref={(el) => (cardsRef.current[idx] = el)}>
              <Link href={`/menu/${encodeURIComponent(item["RCP_NM"])}`}>
                <Image
                  src={item["ATT_FILE_NO_MAIN"]}
                  alt={`${item["RCP_NM"]}Img`}
                  fill
                />
                {item["RCP_NM"]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="cardDesc-container">
        <div className="center-card-text"></div>

        <div className="card-status">
          <label htmlFor="file" className="pr-2.5 text-base">
            {currentCardNum + 1}
            <progress
              className="mx-4"
              id="file"
              max={recipes.length}
              value={currentCardNum + 1}
            />
            35
          </label>
        </div>
      </div>
    </div>
  );
}
