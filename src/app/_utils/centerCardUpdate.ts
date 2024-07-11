import { gsap } from "gsap";

export default function updateCenterCard(cards: HTMLLIElement[]) {
  if (!cards || cards.length === 0) {
    return;
  }

  const gallery = document.querySelector(".gallery");
  const galleryRect = gallery?.getBoundingClientRect();
  const galleryCenter = galleryRect?.left + galleryRect?.width / 2;

  let closestCard = null;
  let closestDistance = Infinity;

  cards
    .filter((card) => card)
    .forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(galleryCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

  cards
    .filter((card) => card)
    .forEach((card) => {
      if (card === closestCard) {
        card.classList.add("center-card");
      } else {
        card.classList.remove("center-card");
      }
    });

  // 중앙 카드 텍스트 업데이트
  const centerCardTextElement = document.querySelector(".center-card-text");
  if (centerCardTextElement && closestCard) {
    centerCardTextElement.textContent = `${closestCard.textContent} 레시피`;
  }

  // 카드 회전 업데이트
  updateCardRotations(
    cards.filter((card) => card),
    galleryCenter,
    galleryRect
  );
}

function updateCardRotations(
  cards: HTMLLIElement[],
  galleryCenter: number,
  galleryRect: DOMRect
) {
  cards
    .filter((card) => card)
    .forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distanceFromCenter = cardCenter - galleryCenter;
      const rotationAngle = (distanceFromCenter / galleryRect.width) * 45; // 반대 방향으로 회전 각도 조정

      gsap.to(card, {
        rotationY: -rotationAngle,
        duration: 0.5,
      });
    });
}
