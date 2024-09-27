import { createContext, useContext } from "react";
import { BookModel } from "../models/BookModel";

export type AppContextData = {
  bookData: BookModel;
  setBookData: (bookData: BookModel) => void;
  currentChapter: number,
  setCurrentChapter: (chapter: number) => void,
  currentParagraph: number,
  setCurrentParagraph: (paragraph: number) => void
};

// set a default value
export const AppContext = createContext<AppContextData>({
  bookData: {
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
