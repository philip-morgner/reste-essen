import translationKeys from "./translationKeys.json";

let lang = "debug";

export const init = language => {
  lang = language;
};

export const t = str => translationKeys[str][lang];
