import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PDF } from "../../app/types";
import client from "../../api/client";

interface PDFState {
  pdfs: PDF[];
  selectedPdfs: PDF[];
  error: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
  combinePDFStatus: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: PDFState = {
  pdfs: [],
  selectedPdfs: [],
  status: "idle",
  error: null,
  combinePDFStatus: 'idle'
};

export const fetchPDFs = createAsyncThunk("pdfs/fetchPDFs", async () => {
  const response = await client.get("stuboo/tools/main/urogyn_pdfs.json");
  return response.data as PDF[];
});

export const combinePDFs = createAsyncThunk("pdfs/combinePDFs", async () => {});

export const pdfsSlice = createSlice({
  name: "pdfs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectPDF: (state, { payload: selectedPDF }: PayloadAction<PDF>) => {
      state.selectedPdfs.push(selectedPDF);
      state.pdfs.map((pdf) => {
        if (pdf.filename === selectedPDF.filename) {
          let newPDF = pdf;
          newPDF.selected = true;
          return newPDF;
        }
        return pdf;
      });
    },

    unSelectPDF: (state, { payload: unSelectedPDF }: PayloadAction<PDF>) => {
      state.selectedPdfs = state.selectedPdfs.filter(
        (pdf) => pdf.filename !== unSelectedPDF.filename
      );
      state.pdfs.map((pdf) => {
        if (pdf.filename === unSelectedPDF.filename) {
          let newPDF = pdf;
          newPDF.selected = false;
          return newPDF;
        }
        return pdf;
      });
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
      })
      .addCase(combinePDFs.pending, (state, { payload }) => {
        
      })
      .addCase(combinePDFs.rejected, (state, { payload }) => {
        
      })
      .addCase(combinePDFs.fulfilled, (state, { payload }) => {
        
      });
  },
});

export const { selectPDF, unSelectPDF } = pdfsSlice.actions;

export default pdfsSlice.reducer;
