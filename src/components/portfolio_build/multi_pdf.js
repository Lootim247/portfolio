"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import styles from "@/styles/components/PortfolioComponents.module.css";

export default function MultiPDF({ params }) {
  const [openInd, setOpenInd] = useState(0);
  
  const items = useMemo(() => {
    if (!params) return [];
    return Array.isArray(params)
      ? params
      : params?.pdfs || params?.pdf_params || params?.arr || [];
  }, [params]);

  const pdfCache = useRef({});

  useEffect(() => {
    items.forEach((item) => {
      if (!pdfCache.current[item.src]) {
        fetch(item.src)
          .then((res) => res.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            pdfCache.current[item.src] = url;
          });
      }
    });
  }, [items]);

  if (!items || items.length === 0) return <div>No PDFs provided.</div>;

  const selected = items[openInd];
  const cachedSrc = pdfCache.current[selected.src] || selected.src;

  return (
    <div className={styles.multi_pdf_container}>
      <div className={styles.button_container}>
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setOpenInd(i)}
            className={
              openInd === i
                ? `${styles.pdf_button} ${styles.pdf_button_active}`
                : styles.pdf_button
            }
          >
            {item.title}
          </div>
        ))}
      </div>

      <div className={styles.pdf_right}>
        <object
          data={cachedSrc}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>
            Your browser cannot display PDFs.{" "}
            <a href={selected.src}>Download instead</a>
          </p>
        </object>
      </div>
    </div>
  );
}
