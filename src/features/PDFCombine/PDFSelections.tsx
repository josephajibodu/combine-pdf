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
          {(!pdfs || pdfs.length) && <p className='text-gray-400 mb-3'>
            No File Selected!
          </p>}

          {pdfs?.map((pdf) => (
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
          ))}

          <button type="button" className="py-2 px-4 flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
              </path>
            </svg>
            Combine Files
          </button>

        </div>}






      <button onClick={() => setShowSelectedPDFs(!showSelectedPDFs)} className="mt-2 flex relative items-center p-4  transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none w-fit">
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

    </div>
  )
}

export default PDFSelections