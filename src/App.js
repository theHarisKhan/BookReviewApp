import React, { useEffect, useState } from 'react'
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import SearchLogo from './loupe.svg'
import Books from './Books';

function App() {

  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("the+alchemist")
  const [loading, setLoading] = useState(false)
  // for unique key
  let id = 1

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items)
        setLoading(true)
        console.log(data.items)
      })
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

  const CheckIt = (arg) => {
    return(
      arg ? arg : null
    )
  }

  return (
    <div className="App">
      <h1 className="app--title">Books review</h1>
      <form onSubmit={getSearch} className="search--form">
        <input 
          type="text" 
          className="search--bar"
          placeholder="Search Book..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="search--btn" type="submit">
          <img src={SearchLogo} alt="icon" className="search--icon"/>
        </button>
      </form>

      <div className="content">
        {loading ? 
            books.slice(0,3).map(book => (
              <Books key={id++} 
                  title={CheckIt(book.volumeInfo.title)}
                  publishedDate={CheckIt(book.volumeInfo.publishedDate)}
                  averageRating={CheckIt(book.volumeInfo.averageRating)}
                  imageLinks={CheckIt(book.volumeInfo.imageLinks['thumbnail'])}
                  authors={CheckIt(book.volumeInfo.authors[0])}
                  categories={CheckIt(book.volumeInfo.categories)}
                  description={CheckIt(book.volumeInfo.description)} />    
            ))  : 
        <Loader type="Puff" 
                color="#00BFFF" 
                height={100} 
                width={100} 
                timeout={3000} />
        }
        
      </div>

    </div>
  )
}

export default App;
