import React from "react";
import { useEffect, useState } from "react";
import { getBooks } from "../utils/api";
import { IoMdLogIn } from "react-icons/io";
import { useNavigate} from 'react-router-dom';
import Footer from "./Footer";
// import Login from "./Login";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {   
                const response = await getBooks();
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchData();
    }, []);

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    const genres = ["All", ...new Set(books.map(book => book.genre))];


    function handleLogin(){
        navigate('/loginForm');
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-[#f5f0e1] shadow-lg rounded-lg">
          <div className="head  ">
            <h1 className="text-center text-4xl font-serif text-[#6D4C41]">📚 Book List</h1>
            <button className="flex items-center justify-center text-end gap-2 p-2 rounded-2xl  bg-[#967d74]" onClick={handleLogin}>Login <IoMdLogIn/></button> 
          </div>

            {/* Search Input */}
            <input 
                type="text" 
                placeholder="🔍 Search books..." 
                className="w-full p-3 border border-[#6D4C41] rounded-lg mt-4 bg-[#FAEBD7] text-[#6D4C41] focus:ring-2 focus:ring-[#8B5A2B] outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Genre Filter Dropdown */}
            <select 
                className="w-full p-3 border border-[#6D4C41] rounded-lg mt-2 bg-[#FAEBD7] text-[#6D4C41] focus:ring-2 focus:ring-[#8B5A2B] outline-none"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
            >
                {genres.map((genre, index) => (
                    <option key={index} value={genre}>{genre}</option>
                ))}
            </select>

            {/* Book List */}
            <ul className="mt-6 space-y-4">
                {filteredBooks.map((book) => (
                    <li key={book._id} className="p-5 bg-[#EDE0D4] shadow-md rounded-lg border border-[#8B5A2B]">
                        <h2 className="text-xl font-semibold text-[#6D4C41]">{book.name}</h2>
                        <p className="text-[#8B5A2B] font-medium">✍️ Author: {book.author}</p>
                        <p className="text-[#8B5A2B] font-medium">💰 Price: ${book.price}</p>
                        <p className="text-[#8B5A2B] font-medium">📖 Genre: {book.genre}</p>
                        <a 
                            href={book.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-700 underline hover:text-blue-900"
                        >
                            📖 Read this Book
                        </a>
                    </li>
                ))}
            </ul>
            <Footer/>
        </div>
    );
};

export default Books;
