import { table as obs_table } from "@observablehq/inputs";

export function table(...args) {
  let tab = obs_table(...args);
  tab.removeAttribute("style");
  return tab;
}
