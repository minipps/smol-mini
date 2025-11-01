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
document.documentElement.style.setProperty(
  '--has-js',
  1
);
document.documentElement.style.setProperty(
  '--is-scrollable',
  document.documentElement.scrollHeight > window.innerHeight ? 1 : 0
);
document.addEventListener('resize', () => {
  document.documentElement.style.setProperty(
    '--is-scrollable',
    document.documentElement.scrollHeight > window.innerHeight ? 1 : 0
  );
});
