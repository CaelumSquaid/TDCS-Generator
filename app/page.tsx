"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Initial
  const [file, setFile] = useState<File>();
  const [pages, setPages] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  let i = 1;

  // configure pdfjs
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  return (
    <main className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border border-gray-300 p-6 shadow-lg w-[800px] h-5/6 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border border-gray-200 rounded p-2 gap-5">
          <h1 className="font-semibold flex-1">TCDS PDF Generator</h1>
          <Input
            type="file"
            className="text-sm flex-1"
            onChange={(ev) => {
              ev.currentTarget.files
                ? setFile(ev.currentTarget.files[0])
                : null;
            }}
          />
        </div>
        <div
          className={`${
            !file && "p-4"
          } border border-gray-200 rounded overflow-hidden w-full`}
        >
          {file ? (
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex gap-2">
                {Array.from(Array(pages - 1), () => i++).map((val, indx) => (
                  <Button
                    key={indx}
                    onClick={(e) => setCurrPage(val)}
                    className="text-xs"
                    variant={currPage == val ? "default" : "outline"}
                  >
                    {val}
                  </Button>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span>
                  {currPage} out of {pages - 1}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          <ScrollArea className="w-full h-full p-2">
            <Document
              file={file}
              className="text-xs text-gray-600"
              noData="No PDF file found ..."
              onLoadSuccess={({ numPages }) => {
                setPages(numPages);
                setCurrPage(1);
              }}
            >
              <Page
                pageNumber={currPage}
                onLoadSuccess={(e) => console.log("rendered!")}
              />
            </Document>
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}
