import React, { useEffect, useState } from 'react'
import books from '../../app/books.json';
import { Book } from '../../app/types';
import BookCard from '../../common/components/BookCard';

const ListFiles = () => {
  const [pdfFiles, setPDFFiles] = useState<Book[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Book[]>([]);

  useEffect(() => {
    setPDFFiles(books);
  }, [])

  const onSelected = (pdf: Book) => {
    let files = selectedFiles;
    files.push(pdf);
    setSelectedFiles(files);
  }

  const onRemoved = (toBeRemovedPDF: Book) => {
    let files = selectedFiles.filter((pdf) => toBeRemovedPDF.filename !== pdf.filename);
    setSelectedFiles(files);
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