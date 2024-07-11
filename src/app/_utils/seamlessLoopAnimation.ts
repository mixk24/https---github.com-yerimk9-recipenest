import { gsap } from "gsap";

export default function buildSeamlessLoop(items, spacing) {
  let overlap = Math.ceil(1 / spacing);
  let startTime = items.length * spacing + 0.5;
  let loopTime = (items.length + overlap) * spacing + 1;

  let rawSequence = gsap.timeline({ paused: true });
  let seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      this._time === this._dur && (this._tTime += this._dur - 0.01);
    },
  });

  let l = items.length + overlap * 2;
  let time = 0;

  gsap.set(items, {
    xPercent: 400,
    opacity: 0,
    scale: 0,
  });

  for (let i = 0; i < l; i++) {
    let index = i % items.length;
    let item = items[index];

    time = i * spacing;
    rawSequence
      .fromTo(
        item,
        { scale: 1, opacity: 1 },
        {
          scale: 0.7,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
          immediateRender: false,
        },
        time
      )
      .fromTo(
        item,
        { xPercent: 400 },
        {
          xPercent: -400,
          duration: 1,
          ease: "none",
          immediateRender: false,
        },
        time
      );
  }

  rawSequence.time(startTime);

  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none",
      }
    );

  return seamlessLoop;
}
