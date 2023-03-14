import React, { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useCopyToClipboard from '../../common/hooks/useCopyToClipboard';
import { clearSelection, combinePDFs, reorderSelection, unSelectPDF } from '../ListFiles/pdfsSlice';
import { toast } from 'react-toastify';
import PDFFileItem from './PDFFileItem';
import { PDF } from '../../app/types';

const PDFSelections = () => {
  const [showSelectedPDFs, setShowSelectedPDFs] = useState<Boolean>(false);
  const pdfFiles = useAppSelector((state) => state.pdfs.selectedPdfs);
  const status = useAppSelector((state) => state.pdfs.combinePDFStatus);
  // const readyToDownloadFile = useAppSelector((state) => state.pdfs.combinedPDF);
  const dispatch = useAppDispatch();

  const [_,copyTextToClipboard] = useCopyToClipboard();

  const combineFiles = () => {
    dispatch(combinePDFs(pdfFiles)).unwrap().then(() => {

      // extract the filenames
      let textToBeCopied = ``;
      pdfFiles.forEach((pdfFile, index) => {
        textToBeCopied += `${pdfFile.description}\n`;
      });

      copyTextToClipboard(textToBeCopied)
        .then(() => {
          toast.info('Combined file names copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
      });
      
    });
  }

  const clearSelectionList = () => {
    dispatch(clearSelection());
  }

  const movePDF = useCallback((sourcePDF: PDF, targetPDF: PDF) => {
    dispatch(reorderSelection({sourcePDF, targetPDF}))
  }, [])

  return (
    <div className='fixed  flex flex-col items-end bottom-4 right-4'>

      {showSelectedPDFs &&
        <div className="transition ease-in duration-1000 shadow-lg rounded-xl w-full max-h-fit w-96 p-4 bg-white dark:bg-gray-800 relative">
          <div className="w-full flex items-center justify-between mb-6">
            <button className="flex items-center hover:text-black dark:text-gray-50 dark:hover:text-white text-gray-800 border-0 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </button>

            <p className="text-gray-800 dark:text-white text-xl font-medium">
              Selected PDF's
            </p>

            {
              pdfFiles.length > 0 && 
              <button onClick={clearSelectionList} type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> */}
              Clear
            </button>
            }

          </div>

          {(!pdfFiles || pdfFiles.length < 1) && <p className='text-gray-400 mb-3'>
            No File Selected!
          </p>}

          <div className={`transition overflow-y-auto max-h-96`}>
            {pdfFiles.map((pdf) => (
              <PDFFileItem key={pdf.filename} movePDF={movePDF}  pdf={pdf} />
            ))}
          </div>


          {status !== 'loading' &&
            <button disabled={pdfFiles.length < 1} onClick={combineFiles} type="button" className={`py-2 px-4 flex justify-center items-center  ${pdfFiles.length < 1 ? 'opacity-30' : 'opacity-100'} bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg`}>
              <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
                </path>
              </svg>
              Combine Files
            </button>}

          {status === 'loading' &&
            <button type="button" className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                </path>
              </svg>
              loading
            </button>}


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
        {pdfFiles.length > 0 && <span className="absolute -top-2 -right-2 w-8 h-8 text-base  rounded-full text-white bg-red-500 p-1">
          {pdfFiles.length}
        </span>}
      </button>

    </div>
  )
}

export default PDFSelections