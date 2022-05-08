import React, { useState } from 'react'

export type Book = {
  title: string,
  filename: string,
  language: string,
  category: string[],
  description: string,
  author: string,
  thumbnail: string,
  updated: string,
  source: string,
};

type CardProps = {
  book: Book
}

const BookCard = ({ book }: CardProps) => {
  const [selected, setSelected] = useState<Boolean>(false);

  return (
    <div className="flex p-4 justify-between flex-col bg-green-100 shadow-lg rounded-lg h-full w-full overflow-hidden">
      <div className="">
        <h1 className="text-gray-900 font-bold text-2xl">
          {book.title}
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          {book.description}
        </p>
      </div>
      <div>
        <div className="flex item-center mt-2 overflow-auto">
          {book.category.map((category) => <span className="bg-gray-500 rounded-full text-white text-xs font-bold px-3 py-2 leading-none flex items-center mr-1 whitespace-nowrap">
            {category}
          </span>)}
        </div>
        <div className="flex item-center justify-between mt-3">
          <h1 className="text-gray-700 font-bold text-xl">
            <small>by</small> {book.author}
          </h1>
          <button type="button" className="w-10 h-10 text-base font-medium rounded-full text-white bg-gray-500 hover:bg-pink-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mx-auto" fill="white" viewBox="0 0 1792 1792">
              <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
              </path>
            </svg>
          </button>
        </div>
      </div>
    </div>

  )
}

export default BookCard