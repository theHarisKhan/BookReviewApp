import React,{ useEffect, useState } from 'react'
import './App.css';

const API_KEY = 'AIzaSyB4fSnOAUSUuKkzq8idjk--a6wVKgfMUSY'

function App() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState('hacking')
  const [id, setId] =  useState('')
  const [term, setTerm] = useState(false)


  useEffect(()=>{
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
      .then(response => response.json())
      .then(result => {
        setBooks(result.items)
        console.log(books)
      }).catch((error) => alert(error.message))
  },[query])

  const getSearch = e => {
    e.preventDefault()
    //replace empty space in search with plus sign(http-Search)
    if (search !== ""){
      search.replace(new RegExp(" ","g"),'+')
      setQuery(search)
      setSearch('')
    } else {
      alert("Enter Book Name")
    }
  }

  const CheckIt = (id) => {
    setId(id)
    console.log("Book id: "+id)
    setTerm(true)
  }

  return (
    <div className="App">
      <h1 className="title">Look Book</h1>

      <form onSubmit={getSearch} className="search--form">
        <input 
          type="text" 
          className="search--bar"
          placeholder="Search Book..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="search--btn" type="submit">
          <img src="https://img.icons8.com/color/344/4a90e2/search--v1.png" alt=""/>
        </button>
      </form>

      <div className="books">
        {books.slice(0,3).map((book,key)=>(
          <div key={key} className="book--item">
            <img 
              src={Object.values(book.volumeInfo.imageLinks)[0]} 
              alt={book.volumeInfo.title} 
              className="BookImg"
            />
            <div className="book--item-btns">
              <a 
                href={book.volumeInfo.previewLink} 
                target='_blank'
                rel="noreferrer"
                className="preview--btn"
              >
                Preview
              </a>

              {book.accessInfo.pdf['acsTokenLink'] !== undefined ? (
                <button 
                  onClick={()=>CheckIt(book.id)}
                  className="read--btn"
                >
                Read Online
              </button>
              ):(
                <h3 className="null--point">Not Available</h3>
              )}

            </div>
                        
          </div>
        ))}
      </div>
      {(term) ? (
        <div className="reading--block">
          <button 
            onClick={()=>setTerm(false)}
            className="close--btn"
          >
            X
          </button>

        {/* for online Book Reading */}
          <iframe 
              title="Pdf Viewer"
              src={`https://books.google.com.pk/books?id=${id}&lpg=PP1&pg=PP1&output=embed`}
              className="iframe">
          </iframe>
        </div>
      ) : ('')}


    </div>
  );
}

export default App;
