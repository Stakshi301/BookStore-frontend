import React, { useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import { addBook,delBook,updateBook } from '../redux/Slice';
import Footer from './Footer';

function Createbook() {
const navigate=useNavigate();
const [bookName,setBookName]=useState('');
const [Price,setPrice]=useState('');
const [author,setAuthor]=useState('');
const [genre,setGenre]=useState('');
const [link,setLink]=useState('');

function handleBack(){
  navigate('/');
}

  const dispatch=useDispatch();
  const showData=useSelector((state)=>state.books.books);
  
  function handleShowBooks(id){
if(!bookName || !Price || !author || !genre || !link) return alert("Feild's are empty no book created😞");
dispatch(addBook({id,bookName,Price,author,genre,link}));
setBookName('');
setAuthor('');
setPrice('');
setGenre('');
setLink('');
  }

  function handleUpdate(id){
    const update= prompt('enter');
    if(update){
      dispatch(update({id,update}))
    }
  }

  return (

    <>
    
    <div className='p-4'>
        <h1 className='text-center font-bold text-amber-50 text-3xl underline'>WELCOME ADMIN</h1>

      <div className="goBack flex m-4 p-4 ">
      <button onClick={handleBack}>Back <IoMdArrowBack/> </button>
      </div>

      <input className=' border border-amber-50 p-1 m-2 rounded' type="text" placeholder='Book name' value={bookName} onChange={(e)=>setBookName(e.target.value)} />
      <input className=' border border-amber-50 p-1 m-2 rounded' type="text" placeholder='Author name'value={author} onChange={(e)=>setAuthor(e.target.value)} />
      <input className=' border border-amber-50 p-1 m-2 rounded' type="number" placeholder='Price' value={Price} onChange={(e)=>setPrice(e.target.value)}/>
      <input className=' border border-amber-50 p-1 m-2 rounded' type="text" placeholder='Genre' value={genre} onChange={(e)=>setGenre(e.target.value)}/>
      <input className=' border border-amber-50 p-1 m-2 rounded' type="text" placeholder='Link' value={link} onChange={(e)=>setLink(e.target.value)}/>
      <button onClick={handleShowBooks} className='bg-amber-50 p-1 rounded'>Create</button>
    </div>

    <div>
<ul>
  {showData.map((item)=>(
    <li key={item.id} className='flex flex-wrap justify-center items-center bg-amber-300 p-2 m-4'> 
      <h2>{item.bookName}</h2>
      <h3>{item.author}</h3>
      <h3>{item.Price}</h3>
      <h3>{item.genre}</h3>
      <h3> <a href="{item.link}" target='_blank' rel='noreferrer'></a>{item.link}</h3>
      <button onClick={()=>dispatch(delBook(item.id))}>🗑️</button>
      <button onClick={()=>handleUpdate(item.id)}>📝</button>
    </li>
  ))}
</ul>
    </div>
    <Footer/>
    </>

  )
}

export default Createbook
