import React from 'react';
import { useAppDispatch } from './app/hooks';
import Navigation from './common/components/Navigation';
import ListFiles from './features/ListFiles';
import PDFSelections from './features/PDFCombine';

function App() {

  return (
    <div className='p-4 bg-gray-100'>
      <Navigation />
      <div className='md:container mx-auto p-4'>
        <ListFiles />
        <PDFSelections />
      </div>
    </div>
  );
}

export default App;
