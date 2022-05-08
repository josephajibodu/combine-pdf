import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import BookCard from './components/BookCard';

function App() {
  return (
    <div className='w-full bg-white p-4'>
      <Navigation />
      <BookCard />
    </div>
  );
}

export default App;
