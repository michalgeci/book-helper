import { split } from "sentence-splitter";

export const splitSentences = (text: string): string[] => {
  const sentences = split(text);

  const sentencesArray = sentences.reduce((acc: string[], curr) => {
    if (curr.type === "Sentence") {
      acc.push(curr.raw);
    }
    return acc;
  }, []);
  return sentencesArray;
};
