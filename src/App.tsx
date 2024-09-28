import React, { useState } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
import { BookModel } from "./models/BookModel";
import { MainScreen } from "./screens/MainScreen";
import { SimpleBookModel } from "./models/SimpleBookModel";

function App() {
  const [bookData, setBookData] = useState<BookModel>({
    title: "",
    author: "",
    chapters: [],
  });

  const [resultTexts, setResultTexts] = useState<SimpleBookModel>([]);

  const [chapter, setChapter] = useState(0);
  const [paragraph, setParagraph] = useState(0);

  return (
    <AppContext.Provider
      value={{
        bookData,
        setBookData,
        resultTexts,
        initResultTexts: (book) => setResultTexts(
          book.chapters.map((chapter) =>
            chapter.originalParagraphs.map(() => '')
          )
        ),
        setResultTexts: (chapter, paragraph, text) => {
          setResultTexts((previous) => {
            const nextState: SimpleBookModel = JSON.parse(
              JSON.stringify(previous)
            );
            try {
              nextState[chapter][paragraph] = text;
            } catch {
              alert("Load book first");
            }
            return nextState;
          });
        },
        currentChapter: chapter,
        setCurrentChapter: setChapter,
        currentParagraph: paragraph,
        setCurrentParagraph: setParagraph,
      }}
    >
      <MainScreen />
    </AppContext.Provider>
  );
}

export default App;
