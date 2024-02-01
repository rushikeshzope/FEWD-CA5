// BookList.jsx
import React, { useState, useEffect } from "react";
import KalviumLogo from "../assets/KalviumLogo.png";
import Form from "./Form";

function BookList() {
  // State for handling search term input
  const [searchTerm, setSearchTerm] = useState('');
  // State for storing books data
  const [books, setBooks] = useState([]);
  // State for indicating loading state while fetching data
  const [loading, setLoading] = useState(true);
  // State for controlling the display of the registration form
  const [showForm, setshowForm] = useState(false);

  // Event handler for updating search term
  const handleSearch = (event) => setSearchTerm(event.target.value);

  // Effect for fetching books data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch books data from API
        const response = await fetch('https://reactnd-books-api.udacity.com/books', {
          headers: {
            'Authorization': 'whatever-you-want'
          }
        });

        if (!response.ok) throw new Error('Network response was not ok');

        // Parse and set books data to state
        const data = await response.json();
        setBooks(data.books);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    // Invoke the fetchData function
    fetchData();
  }, []);

  // Filter books based on the search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Event handler for displaying the registration form
  const HandleClick = () => {
    setshowForm(true);
  };

  return (
    <div>
      {showForm ? (
        <Form setshowForm={setshowForm} />
      ) : (
        <div>
          <div className="header">
            <div className="logo-container">
              <p id="kalvium-book">Kalvium Books</p>
              <img src={KalviumLogo} alt="Kalvium Book Logo" className="logo" />
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="register-button" onClick={HandleClick}>Register</button>
            </div>
          </div>
          {loading ? <p>Loading books...</p> : (
            <ul>
              {filteredBooks.map(book => (
                <li key={book.id} className="book-item">
                  <div className="img-container">
                    <div className="img-overlay"></div>
                    <img src={book.imageLinks.smallThumbnail} alt={book.title} />
                  </div>
                  <span>{book.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default BookList;
