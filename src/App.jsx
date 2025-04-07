import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Books from './components/Books';
import Login from './components/Login';
import Createbook from './components/Createbook';

const App = () => {
  return (
    <div className='bg-[#6D4C41]'>
      <Routes>
     <Route path='/'element={<Books/>}/>
     <Route path='/loginForm' element={<Login/>}/>
     <Route path='/createBook' element={<Createbook/>}/>
      </Routes>

    </div>
  );
};

export default App;
