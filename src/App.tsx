import React, { useState } from 'react';
import './App.css';
import { AppContext } from './context/AppContext';
import { BookModel } from './models/BookModel';
import { MainScreen } from './screens/MainScreen';

function App() {
  const [bookData, setBookData] = useState<BookModel>({
    title: '',
    author: '',
    chapters: []
  })

  return (
    <AppContext.Provider value={{data: bookData, setBookData}}>
      <MainScreen />
    </AppContext.Provider>
  );
}

export default App;
