"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/components/PortfolioComponents.module.css";

export default function PDF({ params }) {
  if (!params?.src) return <div>No PDF provided.</div>;
  
  return (
  <div className={styles.PDF}>
    <object
      data={params.src}
      type="application/pdf"
      width="100%"
      height="100%"
    >
      <p>Your browser cannot display PDFs.
        <a href="/pdfs/myfile.pdf">Download instead</a>
      </p>
    </object>
  </div>

  )
}