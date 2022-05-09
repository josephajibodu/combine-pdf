import React, { useState } from 'react'
import { Book } from '../../app/types'

type CardProps = {
  book: Book,
  onBookSelected?: (book: Book) => void
  onBookRemoved?: (book: Book) => void
}

const BookCard = ({ book, onBookSelected, onBookRemoved }: CardProps) => {
  const [selected, setSelected] = useState<Boolean>(false);

  const toggleSelection = () => {
    const shouldUpdate = !selected;
    setSelected(!selected);

    if (shouldUpdate && onBookSelected) onBookSelected(book);
    else if (!shouldUpdate && onBookRemoved) onBookRemoved(book);
  }

  return (
    <div onClick={toggleSelection} className="flex p-4 justify-between flex-col bg-white shadow-lg hover:shadow-xl cursor-pointer rounded-lg h-full w-full overflow-hidden">
      <div className="">
        <h1 className="text-gray-900 font-bold text-2xl">
          {book.title}
        </h1>
        <p className="my-2 text-gray-600 text-sm">
          {book.description}
        </p>
      </div>
      <div>
        <div className="flex item-center mt-2 overflow-auto">
          {book.category.map((category, index) => <span key={index} className="bg-gray-400 rounded-full text-white text-xs font-bold px-3 py-2 leading-none flex items-center mr-1 whitespace-nowrap">
            {category}
          </span>)}
        </div>
        <div className="flex item-center justify-between mt-3">
          <h1 className="text-gray-400 font-bold text-xl">
            <small>by</small> {book.author}
          </h1>
          <button type="button" className={`p-3 text-base font-medium rounded-full text-white ${selected ? 'bg-green-500' : 'bg-red-500'}`}>
            {selected ?
              (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>) :
              (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>)
            }
          </button>
        </div>
      </div>
    </div>

  )
}

export default BookCard