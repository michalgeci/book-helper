import React, { useContext } from "react";
import { LoadFileButton } from "../components/LoadFileButton";
import { bookModelSchema } from "../models/BookModel";
import { AppContext } from "../context/AppContext";
import "./MainScreen.css";

export const MainScreen: React.FC = () => {
  const {
    data,
    setBookData,
    currentChapter,
    setCurrentChapter,
    currentParagraph,
    setCurrentParagraph,
  } = useContext(AppContext);

  const chapterCount = data.chapters.length;
  const paragraphsCount =
    data.chapters.at(currentChapter)?.originalParagraphs.length ?? 0;

  return (
    <div className="full-screen">
      <div className="row">
        <LoadFileButton
          title="Open JSON"
          fileSchema={bookModelSchema}
          onSuccess={(data) => {
            setBookData(data);
          }}
        />

        <button
          onClick={() => {
            if (currentChapter > 0) {
              setCurrentChapter(currentChapter - 1);
              setCurrentParagraph(0);
            }
          }}
        >
          PREVIOUS CHAPTER
        </button>

        <button
          onClick={() => {
            if (currentChapter < chapterCount - 1) {
              setCurrentChapter(currentChapter + 1);
              setCurrentParagraph(0);
            }
          }}
        >
          NEXT CHAPTER
        </button>

        {`${currentChapter + 1}/${chapterCount}`}

        <button
          onClick={() => {
            if (currentParagraph > 0) {
              setCurrentParagraph(currentParagraph - 1);
            }
          }}
        >
          PREVIOUS PARAGRAPH
        </button>

        <button
          onClick={() => {
            if (currentParagraph < paragraphsCount - 1) {
              setCurrentParagraph(currentParagraph + 1);
            }
          }}
        >
          NEXT PARAGRAPH
        </button>

        {`${currentParagraph + 1}/${paragraphsCount}`}
      </div>

      <div className="content">
        <div className="column">
          {data.chapters
            .at(currentChapter)
            ?.originalParagraphs.at(currentParagraph)}
        </div>

        <div className="column">
          <div className="half-fill" />
          {data.chapters
            .at(currentChapter)
            ?.translatedParagraphs?.map((value) => (
              <div>{value.at(currentParagraph)}</div>
            ))}
          <div className="half-fill" />
        </div>

        <div className="column"></div>
      </div>
    </div>
  );
};
