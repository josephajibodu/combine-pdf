import React, { useState } from 'react'
import { Book } from '../../common/components/BookCard'

type PDFSelectionsProp = {
  pdfs?: Book[]
};

const PDFSelections = ({ pdfs }: PDFSelectionsProp) => {
  const [showSelectedPDFs, setShowSelectedPDFs] = useState<Boolean>(false);

  return (
    <div className='fixed  flex flex-col items-end bottom-4 right-4'>

      {showSelectedPDFs &&
        <div className="transition transition-opacity shadow-lg rounded-xl w-full md:w-80 p-4 bg-white dark:bg-gray-800 relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-6">
            <p className="text-gray-800 dark:text-white text-xl font-medium">
              Selected PDF's
            </p>
            <button className="flex items-center hover:text-black dark:text-gray-50 dark:hover:text-white text-gray-800 border-0 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center mb-2 rounded justify-between p-3 bg-purple-100">
            <div className="flex w-full ml-2 items-center justify-between">
              <p>
                FileName.pdf
              </p>
              <button className="flex items-center hover:text-black dark:text-gray-50 dark:hover:text-white text-gray-800 border-0 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-red-600 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>}


      <button onClick={() => setShowSelectedPDFs(!showSelectedPDFs)} className="flex relative items-center p-4  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none w-fit">
        {!showSelectedPDFs ?
          (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>) :

          (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>)
        }
        {pdfs && <span className="absolute -top-2 -right-2 w-8 h-8 text-base  rounded-full text-white bg-red-500 p-1">
          {pdfs.length}
        </span>}
      </button>
      {pdfs?.map((pdf) => <h2>{pdf.filename}</h2>)}
    </div>
  )
}

export default PDFSelections