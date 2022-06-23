import React, { useCallback, useEffect, useState } from 'react'
import { PDF } from '../../app/types';
import BookCard from '../../common/components/BookCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchPDFs, selectPDF, setFilter, setSearchTerm, unSelectPDF } from './pdfsSlice';
import Skeleton from '../../common/components/Skeleton';

const DEFAULT_FILTER = "any";

const searchFor = (needle: string, haystack: string) => {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

const ListFiles = () => {
  const pdfFiles = useAppSelector((state) => state.pdfs.pdfs);
  const languages = useAppSelector((state) => state.pdfs.languages);
  const filter = useAppSelector((state) => state.pdfs.filter);
  const searchterm = useAppSelector((state) => state.pdfs.searchterm);
  const status = useAppSelector((state) => state.pdfs.status);
  const dispatch = useAppDispatch();

  const [filteredPDFs, setFilteredPDFs] = useState<PDF[]>([]);
  
  const filterSearch = useCallback(
    () => {

      let _filtered;

      // Filter
      if (filter === DEFAULT_FILTER) _filtered = pdfFiles;
      else _filtered = pdfFiles.filter((pdf) => pdf.language === filter);

      // Search
      if (searchterm) {
        // _filtered = _filtered.filter((pdf) => pdf.title.toLowerCase().includes(searchterm.toLowerCase()))
        _filtered = _filtered.filter((pdf) => {
          return searchterm.split(" ").every((q) => {

            return searchFor(q, pdf.title) || pdf.category.map(c => c.toLowerCase()).includes(q.toLowerCase());
          });
        })
      }

      setFilteredPDFs(_filtered);
    },
    [filter, pdfFiles, searchterm]
  )


  useEffect(() => {
    setFilteredPDFs(pdfFiles);
    if (pdfFiles.length === 0) {

      dispatch(fetchPDFs());
    };
  }, [dispatch, pdfFiles]);

  useEffect(() => {
    filterSearch();
  }, [filterSearch]);

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
          <label className='mb-5' htmlFor='search'>Search PDFs:</label>
          <input type="text" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
            placeholder="Enter Search Keyword"
            value={searchterm}
            onChange={(e) => {
              dispatch(setSearchTerm(e.target.value))
            }} />
        </div>

        <div className=" relative ">
          <label className='mb-5' htmlFor='search'>Filter:</label>
          <select value={filter} className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent" name="animals"
            onChange={(e) => {
              dispatch(setFilter(e.target.value))
            }}
          >
            <option value="any">
              All
            </option>
            {languages &&
              languages.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
          </select>

        </div>
      </form>

      <div className='grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 m gap-5'>
        {filteredPDFs.map((pdf: PDF) => (
          <BookCard key={pdf.filename} pdf={pdf} onBookSelected={onSelected} onBookRemoved={onRemoved} />
        ))}
      </div>
    </>
  )
}

export default ListFiles