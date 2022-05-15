import React, { useEffect, useState } from 'react'
import { PDF } from '../../app/types';
import BookCard from '../../common/components/BookCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchPDFs, selectPDF, unSelectPDF } from './pdfsSlice';
import Skeleton from '../../common/components/Skeleton';

const ListFiles = () => {
  const pdfFiles = useAppSelector((state) => state.pdfs.pdfs);
  const status = useAppSelector((state) => state.pdfs.status);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>("");
  const [language, setLanguage] = useState<string>("any");


  useEffect(() => {
    if (pdfFiles.length === 0) dispatch(fetchPDFs());
  }, [dispatch, pdfFiles])

  const onSelected = (pdf: PDF) => {
    dispatch(selectPDF(pdf));
  }

  const onRemoved = (toBeRemovedPDF: PDF) => {
    dispatch(unSelectPDF(toBeRemovedPDF));
  }
  if (status === 'loading') return <Skeleton />
  return (
    <>

      <form className="flex md:flex-row mb-3">
        <div className=" relative flex-auto mr-3">
          <label className='mb-5' htmlFor='search'>Search PDFs: {search}</label>
          <input type="text" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
            placeholder="Enter Search Keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className=" relative ">
          <label className='mb-5' htmlFor='search'>Language Filter:</label>
          <select value={language} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent" name="animals">
            <option value="any">
              All
            </option>
          </select>

        </div>
      </form>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 m gap-5'>
        {pdfFiles.map((pdf: PDF) => (
          <BookCard key={pdf.filename} pdf={pdf} onBookSelected={onSelected} onBookRemoved={onRemoved} />
        ))}
      </div>
    </>
  )
}

export default ListFiles