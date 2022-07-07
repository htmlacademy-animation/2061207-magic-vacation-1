// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import appearingLetters from "./modules/appearingLetters";

document.addEventListener(`DOMContentLoaded`, function () {
  document.body.classList.add(`loaded`);
});

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

appearingLetters(`.intro__title`);
appearingLetters(`.intro__date`);
appearingLetters(`.slider__item-title`);
appearingLetters(`.prizes__title`);
appearingLetters(`.rules__title`);
appearingLetters(`.game__title`);
