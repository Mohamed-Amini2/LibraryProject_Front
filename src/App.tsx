import { useState } from 'react';
import BookList from './components/Books/BookList';
import BookById from './components/Books/BookById';
import './App.css';

function App() {
  const [view, setView] = useState('list');

  return (
    <div className="App">
      <nav className='navBar'>
        <li>Books</li>
        <li>Add Book</li>
        <li>All Books</li>
        <li>Search a Book</li>
        <li></li>
      </nav>
      <header>
        <h1>📚 Book Management System</h1>
        <nav>
          <button 
            onClick={() => setView('list')}
            className={`nav-btn ${view === 'list' ? 'active' : ''}`}
          >
            All Books
          </button>
          <button 
            onClick={() => setView('single')}
            className={`nav-btn ${view === 'single' ? 'active' : ''}`}
          >
            Find by ID
          </button>
        </nav>
      </header>

      <main>
        {view === 'list' ? <BookList /> : <BookById />}
      </main>
    </div>
  );
}

export default App;