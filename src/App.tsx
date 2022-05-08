import React from 'react';
import Navigation from './common/components/Navigation';
import ListFiles from './features/ListFiles';

function App() {
  return (
    <div className='container mx-auto bg-white p-4'>
      <Navigation />
      <ListFiles />
    </div>
  );
}

export default App;
