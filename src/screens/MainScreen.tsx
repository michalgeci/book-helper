import React, { useContext } from "react";
import { LoadFileButton } from "../components/LoadFileButton";
import { bookModelSchema } from "../models/BookModel";
import { AppContext } from "../context/AppContext";

export const MainScreen: React.FC = () => {
  const {data, setBookData} = useContext(AppContext)

  return (
    <div>
      <LoadFileButton
        title="Open JSON"
        fileSchema={bookModelSchema}
        onSuccess={(data) => {
          setBookData(data)
        }}
      />
      MainScreen
      {data.author}
      {data.title}
    </div>
  );
};
