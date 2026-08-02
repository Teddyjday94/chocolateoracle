const cards = document.querySelectorAll('.card--oracle');

const zodiacByCard = [
  {
    sign: 'Aries',
    blurb: 'A bold spark lights your path today. Trust your first instinct and let your heart lead.'
  },
  {
    sign: 'Taurus',
    blurb: 'Pleasure and comfort are your allies. Choose something rich, grounded, and deeply satisfying.'
  },
  {
    sign: 'Gemini',
    blurb: 'Curiosity is your compass. A bright idea or lively conversation will open a lucky door.'
  },
  {
    sign: 'Cancer',
    blurb: 'Your intuition is especially sharp. Follow the feeling that makes you feel at home.'
  }
];

const revealDelay = 220;
let activeCard = null;
let revealTimeout = null;
let tapCount = 0;

function resetCardState(card) {
  card.classList.remove('is-hovered', 'is-primed', 'is-revealed');
  card.dataset.revealState = 'idle';
  card.querySelector('.card-preview-sign').textContent = 'Hover to reveal';
  card.querySelector('.card-reveal-copy').textContent = 'Tap again to let the oracle speak.';
}

function setCardPreview(card, index) {
  const previewSign = card.querySelector('.card-preview-sign');
  const previewLabel = card.querySelector('.card-preview-label');
  const revealCopy = card.querySelector('.card-reveal-copy');
  const zodiac = zodiacByCard[index];

  previewLabel.textContent = 'Your sign';
  previewSign.textContent = zodiac.sign;
  revealCopy.textContent = zodiac.blurb;
}

function clearRevealTimer() {
  if (revealTimeout) {
    window.clearTimeout(revealTimeout);
    revealTimeout = null;
  }
}

cards.forEach((card, index) => {
  const actionButton = card.querySelector('.card-action');

  card.addEventListener('mouseenter', () => {
    card.classList.add('is-hovered');
    card.classList.remove('is-revealed');
    setCardPreview(card, index);
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('is-hovered', 'is-primed');
    clearRevealTimer();
    tapCount = 0;
    card.dataset.revealState = 'idle';
    card.querySelector('.card-preview-sign').textContent = 'Hover to reveal';
    card.querySelector('.card-reveal-copy').textContent = 'Tap again to let the oracle speak.';
  });

  card.addEventListener('click', (event) => {
    event.preventDefault();

    if (card.dataset.revealState === 'revealed') {
      card.classList.remove('is-revealed');
      card.dataset.revealState = 'idle';
      card.querySelector('.card-preview-sign').textContent = 'Hover to reveal';
      card.querySelector('.card-reveal-copy').textContent = 'Tap again to let the oracle speak.';
      tapCount = 0;
      return;
    }

    tapCount += 1;
    card.classList.add('is-hovered', 'is-primed');
    setCardPreview(card, index);
    clearRevealTimer();

    revealTimeout = window.setTimeout(() => {
      if (tapCount >= 2) {
        card.classList.remove('is-primed');
        card.classList.add('is-revealed');
        card.dataset.revealState = 'revealed';
      } else {
        card.classList.remove('is-primed');
        card.dataset.revealState = 'pending';
      }
    }, revealDelay);
  });

  if (actionButton) {
    actionButton.addEventListener('click', (event) => {
      event.stopPropagation();
      card.click();
    });
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.card--oracle')) {
    cards.forEach((card) => {
      resetCardState(card);
      card.classList.remove('is-hovered', 'is-primed', 'is-revealed');
    });
    tapCount = 0;
    clearRevealTimer();
  }
});
