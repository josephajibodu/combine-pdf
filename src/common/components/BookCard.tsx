import React from 'react'
import { PDF } from '../../app/types'

type CardProps = {
  pdf: PDF,
  onBookSelected?: (book: PDF) => void
  onBookRemoved?: (book: PDF) => void,
}

const BookCard = ({ pdf, onBookSelected, onBookRemoved}: CardProps) => {
  const canBeSelected = !(pdf.selected ? true : false);

  const toggleSelection = () => {
    if (canBeSelected && onBookSelected) onBookSelected(pdf);
    else if (onBookRemoved) onBookRemoved(pdf);
  }

  return (
    <div onClick={toggleSelection} className="flex p-4 justify-between flex-col bg-white shadow-lg hover:shadow-xl cursor-pointer rounded-lg h-full w-full overflow-hidden">
      <div className="">
        <h1 className="text-gray-900 font-bold text-2xl">
          {pdf.title}
        </h1>
        <p className="my-2 text-gray-600 text-sm">
          {pdf.description}
        </p>
      </div>
      <div>
        <div className="flex item-center mt-2 overflow-auto">
          {pdf.category.map((category, index) => <span key={index} className="bg-gray-400 rounded-full text-white text-xs font-bold px-3 py-2 leading-none flex items-center mr-1 whitespace-nowrap">
            {category}
          </span>)}
        </div>
        <div className="flex item-center justify-between mt-3">
          <h1 className="text-gray-400 font-bold text-xl">
            <small>by</small> {pdf.author}
          </h1>
          <button type="button" className={`p-3 text-base font-medium rounded-full text-white ${pdf.selected ? 'bg-green-500' : 'bg-red-500'}`}>
            {pdf.selected ?
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