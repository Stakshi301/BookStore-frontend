import React, { useState, useEffect } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBookk, fetchBooks, deleteBookk, updateBookk } from '../redux/Slice';

import Footer from './Footer';

function Createbook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setBookName] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [link, setLink] = useState('');
  const [editId, setEditId] = useState('');
  const [edit, setEdit] = useState({
    name: '',
    price: '',
    author: '',
    genre: '',
    link: '',
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const showData = useSelector((state) => state.books.books);

  const handleBack = () => {
    navigate('/');
  };

  const handleShowBooks = () => {
    if (!name ||  !author || !price || !genre || !link) {
      return alert("Fields are empty. No book created 😞");
    }

    dispatch(addBookk({ name, price, author, genre, link }));
    setBookName('');
    setAuthor('');
    setPrice('');
    setGenre('');
    setLink('');
  };

  const handleEdit = (item) => {
    setEditId(item._id); // Use _id if it's from MongoDB
    setEdit({
      name: item.name,
      price: item.price,
      author: item.author,
      genre: item.genre,
      link: item.link,
    });
  };

  const handleEditChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

 const handleUpdateSave = (id) => {
  dispatch(updateBookk({ id, updatedBook: edit }));
  setEditId(null);
};


  return (
    <>
      <div className="mx-8 p-4">
        <h1 className="text-center font-bold text-amber-50 text-3xl underline mb-6">
          WELCOME ADMIN
        </h1>

        <div className="goBack flex mb-4">
          <button onClick={handleBack} className="text-white flex items-center gap-2">
            <IoMdArrowBack /> Back
          </button>
        </div>

        {/* Create Inputs */}
        <div className="grid grid-cols-6 gap-4 mb-4">
          <input type="text" placeholder="Book name" value={name} onChange={(e) => setBookName(e.target.value)} className="border border-amber-50 p-2 rounded w-full" />
          <input type="text" placeholder="Author name" value={author} onChange={(e) => setAuthor(e.target.value)} className="border border-amber-50 p-2 rounded w-full" />
          <input type="number" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} className="border border-amber-50 p-2 rounded w-full" />
          <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="border border-amber-50 p-2 rounded w-full" />
          <input type="text" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} className="border border-amber-50 p-2 rounded w-full" />
          <button onClick={handleShowBooks} className="bg-amber-50 p-2 rounded w-full font-semibold">Create</button>
        </div>
      </div>

      <div className="ml-4 mr-4">
        <table className="table-auto w-full border-collapse border border-b-red-950 bg-white text-black">
          <thead className="bg-amber-50">
            <tr>
              <th className="border bg-[#FFFBEB] px-4 py-2">Book Name</th>
              <th className="border bg-[#FFFBEB] px-4 py-2">Author Name</th>
              <th className="border bg-[#FFFBEB] px-4 py-2">Price</th>
              <th className="border bg-[#FFFBEB] px-4 py-2">Genre</th>
              <th className="border bg-[#FFFBEB] px-4 py-2">Link</th>
              <th className="border bg-[#FFFBEB] px-4 py-2">D/E</th>
            </tr>
          </thead>
          <tbody>
            {showData.map((item) => (
              <tr key={item._id} className="text-center">
                {editId === item._id ? (
                  <>
                    <td><input name="bookName" value={edit.name} onChange={handleEditChange} className="w-full border px-2 py-1" /></td>
                    <td><input name="author" value={edit.author} onChange={handleEditChange} className="w-full border px-2 py-1" /></td>
                    <td><input name="Price" value={edit.price} onChange={handleEditChange} className="w-full border px-2 py-1" /></td>
                    <td><input name="genre" value={edit.genre} onChange={handleEditChange} className="w-full border px-2 py-1" /></td>
                    <td><input name="link" value={edit.link} onChange={handleEditChange} className="w-full border px-2 py-1" /></td>
                    <td>
                      <button onClick={() => handleUpdateSave(item._id)}>✅</button>
                      <button onClick={() => setEditId(null)}>❌</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className='border border-y-amber-950 w-46 bg-[#EDE0D4] p-1'>{item.name}</td>
                    <td className='border border-y-amber-950 w-46 bg-[#EDE0D4] p-1'>{item.author}</td>
                    <td className='border border-y-amber-950 w-46 bg-[#EDE0D4] p-1'>{item.price}</td>
                    <td className='border border-y-amber-950 w-46 bg-[#EDE0D4] p-1'>{item.genre}</td>
                    <td className='border border-y-amber-950 w-46 bg-[#EDE0D4] p-1'><a href={item.link} target="_blank" rel="noreferrer">{item.link}</a></td>
                    <td className='border border-y-amber-950 w-46 bg-[#EDE0D4] p-1'>
                      <button onClick={() => dispatch(deleteBookk(item._id))}>🗑️</button>
                      <button onClick={() => handleEdit(item)}>📝</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}

export default Createbook;
