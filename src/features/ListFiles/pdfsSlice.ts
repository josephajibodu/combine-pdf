import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../../app/types";
import books from "../../app/books.json";

interface PDFState {
  pdfs: Book[];
  selectedPdfs: Book[];
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: PDFState = {
  pdfs: [],
  selectedPdfs: [],
  status: "idle",
  error: null,
};

const bookEndpoint = () => {
  return new Promise(resolve => setTimeout(() => resolve(books), 6000))
};

export const fetchPDFs = createAsyncThunk("pdfs/fetchPDFs", async () => {
  const books = await bookEndpoint();
  return books as Book[];
});

export const pdfsSlice = createSlice({
  name: "books",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectPDF: (state, action: PayloadAction<Book>) => {
      state.selectedPdfs.push(action.payload);
    },

    unSelectPDF: (state, action: PayloadAction<Book>) => {
      state.selectedPdfs = state.selectedPdfs.filter(
        (pdf) => pdf.filename !== action.payload.filename
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPDFs.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(fetchPDFs.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = "An error occured!";
      })
      .addCase(fetchPDFs.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.pdfs = payload;
      });
  },
});

export const { selectPDF, unSelectPDF } = pdfsSlice.actions;

export default pdfsSlice.reducer;
