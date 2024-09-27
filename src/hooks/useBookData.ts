import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useBookData = () => {
  const {
    bookData,
    setBookData,
  } = useContext(AppContext);

  return {bookData, setBookData}
}