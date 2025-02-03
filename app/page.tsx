"use client";

import { pdfjs } from "react-pdf";
import { useState } from "react";
import { Document, Page } from "react-pdf";

export default function Home() {
  // configure pdfjs
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
  return (
    <main className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border border-gray-300 p-6 shadow-lg">
        <div>
          <h1 className="font-semibold">TCDS PDF Generator</h1>
          <input type="text" />
        </div>
        <Document>
          <Page></Page>
        </Document>
      </div>
    </main>
  );
}
