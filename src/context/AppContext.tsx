import { createContext, useContext } from "react";
import { BookModel } from "../models/BookModel";
import { SimpleBookModel } from "../models/SimpleBookModel";

export type AppContextData = {
  bookData: BookModel;
  setBookData: (bookData: BookModel) => void;
  resultTexts: SimpleBookModel,
  initResultTexts: (book: BookModel) => void;
  setResultTexts: (chapter: number, paragraph: number, text: string) => void,
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
  resultTexts: [],
  initResultTexts: () => {},
  setResultTexts: () => {},
  currentChapter: 0,
  setCurrentChapter: () => {},
  currentParagraph: 0,
  setCurrentParagraph: () => {}
});

export const useGlobalContext = () => useContext(AppContext);
