import { PDFDocument } from "pdf-lib";
import { PDF } from "../app/types";
import { saveAs } from "file-saver";

function extractFileName(pdfFiles: PDF[]): string {
  let _file_name = "";

  pdfFiles.forEach((pdf) => {
    _file_name += `_${pdf.title.split(".pdf")[0].split(" ")[0]}`;
  })

  return _file_name;
}

export default async function mergePDF(pdfFiles: PDF[]) {
  const fileName = extractFileName(pdfFiles);

  try {
    const finalPdfDoc = await PDFDocument.create();

    // This works but, some promise resolve before the others: which then scatters the order of the files.
    // await Promise.all(
    //   pdfFiles.map(async (pdf) => {
    //     const pdfBytes = await fetch(pdf.source).then((res) => res.arrayBuffer());

    //     const pdfDoc = await PDFDocument.load(pdfBytes);

    //     const copiedPages = await finalPdfDoc.copyPages(
    //       pdfDoc,
    //       pdfDoc.getPageIndices()
    //     );

    //     copiedPages.forEach((page) => finalPdfDoc.addPage(page));
    //   })
    // )

    for (let index = 0; index < pdfFiles.length; index++) {
      const pdf = pdfFiles[index];
      console.log("Combining ", pdfFiles[index].title);
      const pdfBytes = await fetch(pdf.source).then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(pdfBytes);

      const copiedPages = await finalPdfDoc.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );

      copiedPages.forEach((page) => finalPdfDoc.addPage(page));
    }

    // It now works!
    const finalPdfBytes = await finalPdfDoc.save();

    saveAs(
      new Blob([finalPdfBytes], { type: "application/pdf" }),
      fileName ?? "pdf-lib_modification.pdf"
    );
  } catch (error) {
    throw error;
  }
}
