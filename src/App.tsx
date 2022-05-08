import React from 'react';
import Navigation from './common/components/Navigation';
import ListFiles from './features/ListFiles';

function App() {
  return (
    <div className='p-4'>
      <Navigation />
      <div className='md:container mx-auto bg-white p-4'>
        <ListFiles />
      </div>
    </div>
  );
}

export default App;
