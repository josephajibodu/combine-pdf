import { PDFDocument } from "pdf-lib";
import { PDF } from "../app/types";
import { saveAs } from "file-saver";

export default async function mergePDF(pdfFiles: PDF[]) {
  try {
    const finalPdfDoc = await PDFDocument.create();

    await Promise.all(
      pdfFiles.map(async (pdf) => {
        const pdfBytes = await fetch(pdf.source).then((res) => res.arrayBuffer());
  
        const pdfDoc = await PDFDocument.load(pdfBytes);
  
        const copiedPages = await finalPdfDoc.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
  
        copiedPages.forEach((page) => finalPdfDoc.addPage(page));
      })
    )

    // It now works!
    const finalPdfBytes = await finalPdfDoc.save();

    saveAs(
      new Blob([finalPdfBytes], { type: "application/pdf" }),
      "pdf-lib_modification.pdf"
    );
  } catch (error) {
    throw error;
  }
}
