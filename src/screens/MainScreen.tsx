import React, { useContext } from "react";
import { LoadFileButton } from "../components/LoadFileButton";
import { bookModelSchema } from "../models/BookModel";
import { AppContext } from "../context/AppContext";
import "./MainScreen.css";
import { ParagraphView } from "../components/ParagraphView";
import { useBookData } from "../hooks/useBookData";
import { Spacer } from "../components/Spacer";
import { download } from "../utils/download";
import { simpleBookModelSchema } from "../models/SimpleBookModel";

export const MainScreen: React.FC = () => {
  const {
    currentChapter,
    setCurrentChapter,
    currentParagraph,
    setCurrentParagraph,
    resultTexts,
    initResultTexts,
    setResultTexts,
    setResultTestsFull,
  } = useContext(AppContext);

  const { bookData, setBookData } = useBookData();

  const chapterCount = bookData.chapters.length;

  const paragraphsCount =
    bookData.chapters.at(currentChapter)?.originalParagraphs.length ?? 0;

  const getOriginalParagraph = () =>
    bookData.chapters
      .at(currentChapter)
      ?.originalParagraphs.at(currentParagraph);

  const getTranslatedParagraphs = () =>
    bookData.chapters.at(currentChapter)?.translatedParagraphs;

  const NextChapterButton = () => (
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
  );

  const PreviousChapterButton = () => (
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
  );

  const NextParagraphButton = () => (
    <button
      onClick={() => {
        if (currentParagraph < paragraphsCount - 1) {
          setCurrentParagraph(currentParagraph + 1);
        }
      }}
    >
      NEXT PARAGRAPH
    </button>
  );

  const PreviousParagraphButton = () => (
    <button
      onClick={() => {
        if (currentParagraph > 0) {
          setCurrentParagraph(currentParagraph - 1);
        }
      }}
    >
      PREVIOUS PARAGRAPH
    </button>
  );

  const SaveButton = () => (
    <button
      onClick={() => {
        if (bookData.chapters.length) {
          download(
            JSON.stringify(resultTexts),
            `${bookData.author}-${bookData.title}-edit.json`
          );
        } else {
          alert("Load book JSON first");
        }
      }}
    >
      SAVE TO JSON
    </button>
  );

  const LoadButton = () => (
    <LoadFileButton
      fileSchema={simpleBookModelSchema}
      title="LOAD PROGRESS"
      hideFilename
      preventDefault={
        bookData.chapters.length
          ? undefined
          : () => {
              alert("Load book JSON first");
            }
      }
      onSuccess={(data) => {
        setResultTestsFull(data);
      }}
    />
  );

  return (
    <div className="full-screen">
      <div className="row header">
        <LoadFileButton
          title="Open JSON"
          fileSchema={bookModelSchema}
          onSuccess={(data) => {
            setBookData(data);

            if (resultTexts.length === 0) {
              initResultTexts(data);
            }
          }}
        />

        <Spacer />

        <PreviousChapterButton />
        <NextChapterButton />

        {`${currentChapter + 1}/${chapterCount}`}

        <Spacer />

        <PreviousParagraphButton />
        <NextParagraphButton />

        {`${currentParagraph + 1}/${paragraphsCount}`}
        <Spacer />

        <LoadButton />
        <SaveButton />
      </div>

      <div className="content">
        <div className="column">
          {<ParagraphView text={getOriginalParagraph() ?? ""} />}
        </div>

        <div className="column">
          <div className="half-fill" />
          {getTranslatedParagraphs()?.map((value) => (
            <ParagraphView text={value.at(currentParagraph) ?? ""} />
          ))}
          <div className="half-fill" />
        </div>

        <div className="result-column">
          <textarea
            className="result-text-area"
            onChange={(e) => {
              setResultTexts(currentChapter, currentParagraph, e.target.value);
            }}
            value={resultTexts.at(currentChapter)?.at(currentParagraph)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
