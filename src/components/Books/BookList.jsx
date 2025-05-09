import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import "../../App.css";

const BookList = () => {
    const [state, setState] = useState({
        books: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await apiClient.get("/api/books");
                console.log(response);
                setState({
                    books: response.data,
                    loading: false,
                    error: null,
                });
            } catch (err) {
                setState((prev) => ({
                    ...prev,
                    error:
                        err.response?.data?.message ||
                        "Failed to load books. Please try again later.",
                    loading: false,
                }));
                console.error("API Error:", err);
            }
        };

        fetchBooks();
    }, []);

    if (state.loading) {
        return (
            <div className="loading-spinner">
                <p>Loading books...</p>
            </div>
        );
    }

    if (state.error) {
        return (
            <div className="error-message">
                <p>{state.error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="book-list">
            <h1 className="page-title">Our Book Collection</h1>
            <ul className="book-grid">
                {state.books.map((book) => (
                    <li key={book.id} className="book-card">
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
                        <div className="book-details">
                            <h3 className="book-title">{book.Title}</h3>
                            <div className="book-meta">
                                <p className="book-info">
                                    <span className="label">ISBN:</span>
                                    <span className="value">{book.ISBN}</span>
                                </p>
                                <p className="book-info">
                                    <span className="label">Author:</span>
                                    <span className="value">
                                        {book.author?.name || "Unknown"}
                                    </span>
                                </p>
                                <p className="book-info">
                                    <span className="label">Genre:</span>
                                    <span className="value">{book.Genre}</span>
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;

