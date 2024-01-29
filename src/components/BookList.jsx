import React, { useState, useEffect } from "react";
import KalviumLogo from "../assets/KalviumLogo.png";
import RegistrationForm from "./RegisterForm";

function BookList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm,setshowForm] = useState(false);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reactnd-books-api.udacity.com/books', {
          headers: {
            'Authorization': 'whatever-you-want'
          }
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setBooks(data.books);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HandleClick = () => {
    setshowForm(true);
  }

  return (
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
            <li key={book.id}>
              {console.log(book)}
              <img src={book.imageLinks.smallThumbnail} alt={book.title} />
              <span>{book.title}</span>
            </li>
          ))}
        </ul>
      )}
      {showForm ? <RegistrationForm /> : null}
    </div>
  );
}

export default BookList;