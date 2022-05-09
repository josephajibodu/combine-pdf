import React, { useEffect } from 'react'
import { PDF } from '../../app/types';
import BookCard from '../../common/components/BookCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchPDFs, selectPDF, unSelectPDF } from './pdfsSlice';
import Skeleton from '../../common/components/Skeleton';

const ListFiles = () => {
  const pdfFiles = useAppSelector((state) => state.pdfs.pdfs);
  const status = useAppSelector((state) => state.pdfs.status);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchPDFs());
  }, [dispatch])
  
  const onSelected = (pdf: PDF) => {
    dispatch(selectPDF(pdf));
  }

  const onRemoved = (toBeRemovedPDF: PDF) => {
    dispatch(unSelectPDF(toBeRemovedPDF));
  }
  if (status === 'loading') return <Skeleton />
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 m gap-5'>
      {pdfFiles.map((pdf : PDF) => (
        <BookCard key={pdf.filename} pdf={pdf} onBookSelected={onSelected} onBookRemoved={onRemoved} />
      ))}
    </div>
  )
}

export default ListFiles