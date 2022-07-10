import {AppTheme} from "./constants";

const themes = Object.values(AppTheme);

export const setAppTheme = (activeSlider) => {
  document.body.classList.remove(...themes);

  let activeTheme;

  switch (activeSlider) {
    case 0:
    case 1:
      activeTheme = AppTheme.PURPLE;
      break;
    case 2:
    case 3:
      activeTheme = AppTheme.BLUE;
      break;
    case 4:
    case 5:
      activeTheme = AppTheme.LIGHT_BLUE;
      break;
    case 6:
    case 7:
      activeTheme = AppTheme.DEFAULT;
      break;
    default:
      activeTheme = AppTheme.DEFAULT;
  }

  document.body.classList.add(activeTheme);
};

export const setDefaultAppTheme = () => {
  setAppTheme(-1);
};
