export default (classNameElementWithText = ``) => {

  const MIN_ANIMATION_DURATION = 1;
  const MAX_ANIMATION_DURATION = 250;

  const nodeElement = document.querySelector(classNameElementWithText);
  const text = nodeElement.textContent.trim();

  if (!text) {
    return;
  }
  nodeElement.classList.add(`appearing-letters`);

  const words = text.split(` `);

  const documentFragment = document.createDocumentFragment();

  words.forEach((word) => {
    const wordContainer = document.createElement(`span`);
    wordContainer.classList.add(`appearing-letters__container`);
    const letters = word.split(``);

    letters.forEach((symbol) => {
      const letter = document.createElement(`span`);
      letter.classList.add(`appearing-letters__symbol`);
      letter.style.transitionDelay = `${Math.floor(Math.random() * MAX_ANIMATION_DURATION) + MIN_ANIMATION_DURATION}ms`;
      letter.textContent = symbol;

      wordContainer.appendChild(letter);
    });
    documentFragment.appendChild(wordContainer);
  });

  nodeElement.textContent = ``;
  nodeElement.appendChild(documentFragment);
};
