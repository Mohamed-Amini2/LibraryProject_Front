import { useState } from 'react';
import BookList from './components/BookList';
import BookById from './components/BookById';
import './navBarCss.css';

function navBar() {
  const [view, setView] = useState('list');

  return (
    <div className="App">
      {/* Transparent Navigation Bar */}
      <nav className="glass-navbar">
        <div className="nav-brand">
          <span className="logo">📚</span>
          <h1>Book Manager</h1>
        </div>
        
        <div className="nav-links">
          <button 
            onClick={() => setView('list')}
            className={`nav-link ${view === 'list' ? 'active' : ''}`}
          >
            All Books
          </button>
          <button 
            onClick={() => setView('single')}
            className={`nav-link ${view === 'single' ? 'active' : ''}`}
          >
            Find Book
          </button>
          <button className="nav-link">Authors</button>
          <button className="nav-link">Genres</button>
          <button className="nav-link">About</button>
        </div>
      </nav>

      <main className="content-wrapper">
        {view === 'list' ? <BookList /> : <BookById />}
      </main>
    </div>
  );
}

export default navBar;