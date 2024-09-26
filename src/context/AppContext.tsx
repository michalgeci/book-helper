import { createContext, useContext } from "react";
import { BookModel } from "../models/BookModel";

export type AppContextData = {
  data: BookModel;
  setBookData: (bookData: BookModel) => void;
};

// set a default value
export const AppContext = createContext<AppContextData>({
  data: {
    title: "",
    author: "",
    chapters: []
  },
  setBookData: () => {},
});

export const useGlobalContext = () => useContext(AppContext);
