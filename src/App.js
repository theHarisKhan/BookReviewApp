import React, { useEffect, useState } from 'react'
import './App.css';

function App() {
  const APP_KEY = 'nPAwglGw20GtTIU6EIQ2M707gVGYacFg'

  const [books, setBooks] = useState([])

  useEffect(() => {
    GetRequest()
  },[])

  const GetRequest = async () => {
    const response = await fetch(
     ` https://api.nytimes.com/svc/books/v3/reviews.json?title=Deacon+King+Kong&api-key=${APP_KEY}`

    )
    const data = await response.json()
    setBooks(data.results)
    console.log(data.results)
  }

  return (
    <div className="App">
      <h1>Books review App</h1>
      {books.map(book => (
        <>
          <h1>{book.book_title}</h1>
          <img src={`http://covers.openlibrary.org/b/isbn/${book.isbn13[0]}-M.jpg`} alt={book.book_title} />
          <h3>{book.book_author}</h3>
        </>
        // console.log(book.isbn13[0])
      ))}
    </div>
  );
}

export default App;
