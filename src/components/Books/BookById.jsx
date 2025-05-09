import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import "../../App.css";

const BookById = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookId, setBookId] = useState("");

  const fetchBook = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(`/api/books/${id}`);
      if (response.data) {
        setBook(response.data);
      } else {
        setError("Book not found");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch book");
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookId) {
      fetchBook(bookId);
    }
  };

  return (
    <div className="book-container">
      <h1>Find Book by ID</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Enter Book ID"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p className="loading">Loading book details...</p>}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setBookId("")}>Clear</button>
        </div>
      )}

      {book && (
        <div className="book-details">
          <div className="book-image-container">
          {book.BooksImage && (
                                <img
                                    src={`${book.BooksImage}`}
                                    alt={book.Title}
                                    className="book-cover"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />
                            )}
          </div>
          <div className="book-info">
            <h2 className="book-title">{book.Title}</h2>
            <div className="book-meta">
              <p>
                <span className="label">ISBN:</span>
                <span className="value">{book.ISBN}</span>
              </p>
              <p>
                <span className="label">Publication Date:</span>
                <span className="value">
                  {new Date(book.PublicationDate).toLocaleDateString()}
                </span>
              </p>
              <p>
                <span className="label">Genre:</span>
                <span className="value">{book.Genre}</span>
              </p>
              <p>
                <span className="label">Author ID:</span>
                <span className="value">{book.author?.id || "N/A"}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookById;