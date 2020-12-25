import React from 'react'
import './Books.css'

function Books({
    title,
    publishedDate,
    averageRating,
    imageLinks,
    authors,
    categories,
    description
}) {
    return (
        <div className="Books">
            <h1>{title}<span>({publishedDate})</span></h1>
            <h3>by {authors}</h3>
            <img src={imageLinks} alt={title} loading="lazy"/>
            <h2 className="rating">Avergae rating is '{averageRating}'</h2>
            <h4 className="category">categories:- {categories}</h4>
            <p className="summary"><span>Summary:-<br/></span> {description}</p>
        </div>
    )
}

export default Books
