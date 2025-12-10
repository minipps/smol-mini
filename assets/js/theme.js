// Originally from: https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f
// I slightly tweaked it to use view transitions and some other things.
/**
 * Utility function to calculate the current theme setting.
 * Look for a local storage value.
 * Fall back to system setting.
 * Fall back to light mode.
 */
function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingLight,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingLight.matches) {
    return "light";
  }

  return "dark";
}

/**
 * Utility function to update the button text and aria-label.
 */
function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";
  //const newButtonText = isDark ? "☀︎" : "⏾";
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example
  buttonEl.setAttribute("aria-label", newCta);
  //buttonEl.innerText = newButtonText;
}

/**
 * Utility function to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const button = document.querySelector(".theme-toggle");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");

/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingLight,
});

/**
 * 3. Update the theme setting and button text accoridng to current settings
 */
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
 * 4. Add an event listener to toggle the theme
 */
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  currentThemeSetting = newTheme;
  if (!document.startViewTransition) {
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
    return;
  }
  const transition = document.startViewTransition(() => {
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  });
});


// Progressbar stuff
const root = document.documentElement;
const progressBarMain = document.getElementById('progress-bar-main');

root.style.setProperty(
  '--has-js',
  1
);

const syncScrollableFlag = () => {
  const isScrollable = root.scrollHeight > window.innerHeight;
  root.style.setProperty(
    '--is-scrollable',
    isScrollable ? 1 : 0
  );
  return isScrollable;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

let scheduledFrame = null;
const updateProgress = () => {
  const scrollableHeight = root.scrollHeight - window.innerHeight;
  const progress = scrollableHeight <= 0
    ? 0
    : clamp(window.scrollY / scrollableHeight, 0, 1);
  root.style.setProperty('--scroll-progress', progress.toFixed(4));
  scheduledFrame = null;
};

const requestProgressUpdate = () => {
  if (scheduledFrame !== null) return;
  scheduledFrame = requestAnimationFrame(updateProgress);
};

const initProgressBar = () => {
  syncScrollableFlag();
  if (!progressBarMain) return;

  updateProgress();
  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
  window.addEventListener('resize', () => {
    const scrollable = syncScrollableFlag();
    if (!scrollable) {
      root.style.setProperty('--scroll-progress', 0);
    }
    requestProgressUpdate();
  });
};

initProgressBar();
