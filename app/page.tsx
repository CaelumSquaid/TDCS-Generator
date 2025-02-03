"use client";

import { pdfjs } from "react-pdf";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function Home() {
  const [file, setFile] = useState<File>();
  // configure pdfjs
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
  return (
    <main className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border border-gray-300 p-6 shadow-lg h-5/6 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border border-gray-200 rounded p-2">
          <h1 className="font-semibold">TCDS PDF Generator</h1>
          <input
            type="file"
            className="text-sm"
            onChange={(ev) => {
              ev.currentTarget.files
                ? setFile(ev.currentTarget.files[0])
                : null;
            }}
          />
        </div>
        <div className="overflow-y-scroll h-full border border-gray-300 rounded">
          <Document file={file}>
            <Page pageNumber={1}></Page>
          </Document>
        </div>
      </div>
    </main>
  );
}
