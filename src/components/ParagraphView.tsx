import React from "react";
import "./ParagraphView.css"
import { splitSentences } from "../utils/SplitSentence";

type ParagraphViewProps = {
  text: string;
};

export const ParagraphView: React.FC<ParagraphViewProps> = ({ text }) => {
  const splitText = splitSentences(text)
  return (
    <div className="card">
      {splitText.map((line) => (
        <p>{line}</p>
      ))}
    </div>
  );
};
