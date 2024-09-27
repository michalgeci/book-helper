import React, { useState } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
import { BookModel } from "./models/BookModel";
import { MainScreen } from "./screens/MainScreen";

function App() {
  const [bookData, setBookData] = useState<BookModel>({
    title: "",
    author: "",
    chapters: [],
  });

  const [chapter, setChapter] = useState(0);
  const [paragraph, setParagraph] = useState(0);

  return (
    <AppContext.Provider
      value={{
        bookData: bookData,
        setBookData,
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
