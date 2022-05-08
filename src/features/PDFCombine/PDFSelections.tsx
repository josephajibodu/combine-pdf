import React from 'react'
import { Book } from '../../common/components/BookCard'

type PDFSelectionsProp = {
  pdfs? : Book[]
};

const PDFSelections = ({ pdfs } : PDFSelectionsProp) => {
  return (
    <div className='fixed bottom-4 right-4'>
      {pdfs?.map((pdf) => <h2>{pdf.filename}</h2> )}
    </div>
  )
}

export default PDFSelections