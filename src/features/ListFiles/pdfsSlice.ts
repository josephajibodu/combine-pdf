import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PDF } from "../../app/types";
import client from "../../api/client";

interface PDFState {
  pdfs: PDF[];
  selectedPdfs: PDF[];
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: PDFState = {
  pdfs: [],
  selectedPdfs: [],
  status: "idle",
  error: null,
};

export const fetchPDFs = createAsyncThunk("pdfs/fetchPDFs", async () => {
  const response = await client.get("stuboo/tools/main/urogyn_pdfs.json");
  return response.data as PDF[];
});

export const pdfsSlice = createSlice({
  name: "pdfs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectPDF: (state, action: PayloadAction<PDF>) => {
      state.selectedPdfs.push(action.payload);
    },

    unSelectPDF: (state, action: PayloadAction<PDF>) => {
      state.selectedPdfs = state.selectedPdfs.filter(
        (pdf) => pdf.filename !== action.payload.filename
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPDFs.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(fetchPDFs.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = "An error occured!";
      })
      .addCase(fetchPDFs.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.pdfs = payload;
      });
  },
});

export const { selectPDF, unSelectPDF } = pdfsSlice.actions;

export default pdfsSlice.reducer;
