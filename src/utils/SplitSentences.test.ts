import { splitSentences } from "./SplitSentence";

describe("SplitSentence", () => {
  it("should split into array", () => {
    const sentences = splitSentences(
      'Hello, are you ok? He asked. Mrs. Maria replied: "I am ok".'
    );
    expect(sentences).toEqual([
      "Hello, are you ok?",
      "He asked.",
      'Mrs. Maria replied: "I am ok".',
    ]);
  });
});
