import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState={books:[]};

const bookSlice=createSlice({
    name:'book',
    initialState,

    reducers:{
        addBook:(state,action)=>{
          const newBook={id:nanoid(),...action.payload};
          state.books.push(newBook);
        },

        delBook:(state,action)=>{
            state.books=state.books.filter((book)=>book.id!==action.payload);
        },

        updateBook:(state,action)=>{
            state.books=state.books.map((book)=>book.id===action.payload.id 
        ? {...book,text:action.payload.updateBook} : book);

        }
    }
})


export const {addBook,delBook,updateBook} = bookSlice.actions;
export default bookSlice.reducer;