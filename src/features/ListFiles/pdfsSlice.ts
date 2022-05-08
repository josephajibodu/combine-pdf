import { createSlice, PayloadAction , createAsyncThunk} from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '../../app/store'
import { Book } from '../../app/types'
import books from '../../app/books.json';

interface PDFState {
  pdfs: Book[]
  selectedPdfs: Book[]
}

const initialState : PDFState = {
  pdfs: [],
  selectedPdfs: []
}

// export const fetchPDFs = createAsyncThunk('pdfs/fetchPDFs', async () => {
  
//   return books;
// })


export const pdfsSlice = createSlice({
  name: 'books',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    
    selectPDF: (state, action: PayloadAction<Book>) => {
      state.selectedPdfs.push(action.payload);
    },

    unSelectPDF: (state, action: PayloadAction<Book>) => {
      state.selectedPdfs.filter((pdf) => pdf.filename !== action.payload.filename)
    },

    updateBooks: (state, action: PayloadAction<Book[]>) => {
      state.pdfs = action.payload;
    },
  },
})



export const { selectPDF, unSelectPDF, updateBooks } = pdfsSlice.actions;

export const fetchPDFs = () => async (dispatch:AppDispatch) => {
  const response = books;
  console.log(response);
  dispatch(updateBooks(response))
}

export default pdfsSlice.reducer