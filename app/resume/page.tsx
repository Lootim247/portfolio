import styles from "@/styles/pdf.module.css";
import PDFViewer from "@/components/PDFViewer";

export default function PDF() {
    return (
        <div className={styles.page}>
            <div className={styles.pdf_wrapper}>
                <div className={styles.pdf}>
                    <PDFViewer source={"/Resume.pdf"}/>
                </div>
            </div>
        </div>
    )
}