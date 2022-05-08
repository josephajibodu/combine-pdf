import React, { useEffect, useState } from 'react'
import books from '../../app/books.json';
import { Book } from '../../app/types';
import BookCard from '../../common/components/BookCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchPDFs, selectPDF, unSelectPDF } from './pdfsSlice';

const ListFiles = () => {
  useEffect(() => {
    dispatch(fetchPDFs());
  }, [])
  const pdfFiles = useAppSelector((state) => state.pdfs.pdfs);
  const dispatch = useAppDispatch()
  
  const onSelected = (pdf: Book) => {
    dispatch(selectPDF(pdf));
  }

  const onRemoved = (toBeRemovedPDF: Book) => {
    dispatch(unSelectPDF(toBeRemovedPDF));
  }

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 m gap-5'>
      {pdfFiles.map((pdf : Book) => (
        <BookCard key={pdf.filename} book={pdf} onBookSelected={onSelected} onBookRemoved={onRemoved} />
      ))}
    </div>
  )
}

export default ListFiles