import { createContext, useContext } from "react";
import { BookModel } from "../models/BookModel";

export type AppContextData = {
  data: BookModel;
  setBookData: (bookData: BookModel) => void;
  currentChapter: number,
  setCurrentChapter: (chapter: number) => void,
  currentParagraph: number,
  setCurrentParagraph: (paragraph: number) => void
};

// set a default value
export const AppContext = createContext<AppContextData>({
  data: {
    title: "",
    author: "",
    chapters: []
  },
  setBookData: () => {},
  currentChapter: 0,
  setCurrentChapter: () => {},
  currentParagraph: 0,
  setCurrentParagraph: () => {}
});

export const useGlobalContext = () => useContext(AppContext);
