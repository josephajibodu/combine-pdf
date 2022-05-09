import { createSlice, PayloadAction , createAsyncThunk} from '@reduxjs/toolkit'
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

export const fetchPDFs = createAsyncThunk('pdfs/fetchPDFs', async () => {
  
  return books as Book[];
})


export const pdfsSlice = createSlice({
  name: 'books',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    
    selectPDF: (state, action: PayloadAction<Book>) => {
      state.selectedPdfs.push(action.payload);
    },

    unSelectPDF: (state, action: PayloadAction<Book>) => {
      state.selectedPdfs = state.selectedPdfs.filter((pdf) => pdf.filename !== action.payload.filename)
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPDFs.fulfilled, (state, { payload }) => {
      state.pdfs = payload;
    })
  },
})



export const { selectPDF, unSelectPDF } = pdfsSlice.actions;

export default pdfsSlice.reducer