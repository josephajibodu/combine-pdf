import React from 'react';
import { useAppDispatch } from './app/hooks';
import Navigation from './common/components/Navigation';
import ListFiles from './features/ListFiles';
import PDFSelections from './features/PDFCombine';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  return (
    <div className='p-4 bg-gray-100'>
      <Navigation />
      <div className='md:container mx-auto p-4'>
        <ListFiles />

        <DndProvider backend={HTML5Backend}>
          <PDFSelections />
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
