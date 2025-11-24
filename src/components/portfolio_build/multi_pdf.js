import { useState, useEffect, useRef, useMemo } from "react";
import styles from "@/styles/components/PortfolioComponents.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docca } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

export default function MultiPDF({ params }) {
  const [openInd, setOpenInd] = useState(0);
  const [txtCache, setTxtCache] = useState({});
  
  const items = useMemo(() => {
    if (!params) return [];
    return Array.isArray(params)
      ? params
      : params?.pdfs || params?.pdf_params || params?.arr || [];
  }, [params]);

  async function loadTxt(url) {
    const res = await fetch(url);
    const text = await res.text();
    return text;
  }

  const selected = items[openInd];
  useEffect(() => {
    if (selected?.type === "txt" && !txtCache[selected.src]) {
      loadTxt(selected.src).then((text) => {
        setTxtCache((prev) => ({ ...prev, [selected.src]: text }));
      });
    }
  }, [selected, txtCache]);

  if (!items || items.length === 0) return <div>No PDFs provided.</div>;

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
        {selected.type === "pdf" ? (
          <object data={selected.src} type="application/pdf" width="100%" height="100%">
            <p>
              Your browser cannot display PDFs. <a href={selected.src}>Download instead</a>
            </p>
          </object>
        ) : (
          <SyntaxHighlighter
            className={styles.code}
            language={selected.language}
            style={docca}
            showLineNumbers={true}
            codeTagProps={{
              style: { whiteSpace: "pre-wrap" }
            }}
          >
            {txtCache[selected.src] || "Loading..."}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
