export const pluralize = (word: string, n: number) =>
  `${word}${n === 1 ? "" : "s"}`;

export const count = (word: string, n: number) => `${n} ${pluralize(word, n)}`;
