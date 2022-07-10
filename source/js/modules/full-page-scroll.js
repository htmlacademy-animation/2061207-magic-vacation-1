import throttle from 'lodash/throttle';
import {AppTheme, Page} from "./constants";
import {storySlider} from "./slider";
import {setDefaultAppTheme, setAppTheme} from "./utils";

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.mainBlock = document.querySelector(`.page-content`);

    this.activeScreen = Page.MAIN;
    this.prevActiveScreen = Page.MAIN;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
    this.endTransitionMainScreenHandler = this.endTransitionListener.bind(this);

    setDefaultAppTheme();

  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  endTransitionListener() {
    this.mainBlock.classList.remove(`page-content_fill`);
    this.mainBlock.classList.add(`page-content_hidden`);
    this.mainBlock.removeEventListener(`transitionend`, this.endTransitionMainScreenHandler);
  }

  fillScreen() {
    this.mainBlock.classList.remove(`page-content_hidden`);
    this.mainBlock.classList.add(`page-content_fill`);
    this.mainBlock.addEventListener(`transitionend`, this.endTransitionMainScreenHandler);
  }


  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    this.prevActiveScreen = this.activeScreen;
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    if (this.prevActiveScreen === Page.HISTORY && this.activeScreen === Page.GIFT) {
      this.fillScreen();
      setTimeout(() => {
        this.changeVisibilityDisplay();
      }, 500);
    } else {
      this.changeVisibilityDisplay();
    }
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();

    if (this.activeScreen === Page.HISTORY) {
      setAppTheme(storySlider.activeIndex);
    } else if (!document.body.classList.contains(AppTheme.DEFAULT)) {
      setDefaultAppTheme();
    }

  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, 100);
  }

  changeActiveMenuItem() {
    const activeItem =
      Array.from(this.menuElements)
        .find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
