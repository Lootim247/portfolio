export default function PDFViewer({ source }: { source: string }) {
    return (
        <iframe
            src={source}
            style={{
                flex: 1,
                width: "100%",
                minHeight: 0,
                border: "none",
            }}
            title="PDF Viewer"
        />
    );
}