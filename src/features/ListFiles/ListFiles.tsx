import React from 'react'
import books from '../../app/books.json';
import BookCard, { Book } from '../../common/components/BookCard';

const ListFiles = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 m gap-5'>
      {books.map((book : Book) => (
        <BookCard key={book.filename} book={book} />
      ))}
    </div>
  )
}

export default ListFiles