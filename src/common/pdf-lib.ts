import { PDFDocument } from "pdf-lib";
import { PDF } from "../app/types";
import { saveAs } from "file-saver";

export default async function mergePDF(pdfFiles: PDF[]) {
  const finalPdfDoc = await PDFDocument.create();

  pdfFiles.forEach(async (pdf) => {
      const pdfBytes = await fetch(pdf.source).then((res) => res.arrayBuffer());
    
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const pdfPageIndices = pdfDoc.getPageIndices();
      const copiedPages = await finalPdfDoc.copyPages(pdfDoc, pdfPageIndices);

      (await copiedPages).forEach((page) => pdfDoc.addPage(page));
    
  });

  const finalPdfBytes = await finalPdfDoc.save();

  saveAs(
    new Blob([finalPdfBytes], { type: "application/pdf" }),
    "pdf-lib_modification.pdf"
  );
}
