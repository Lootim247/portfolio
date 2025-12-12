import styles from "@/styles/pages/Newspaper.module.css"

export default function Newspaper( ) {
    const boxStyle = {
        width: '150px',   // Fixed width in pixels (string value)
        height: '150px',  // Fixed height in pixels (string value)
        backgroundColor: 'lightgreen',
        border: '1px solid black',
        padding: '10px'
    };

    return (
        <div className={styles.gridContainer}>
            <div className={styles.item}> BOX </div>
            <div className={styles.item2}> BOX </div>
            <div className={styles.item}> BOX </div>
            <div className={styles.item2}> BOX </div>

            <div className={styles.item}> BOX </div>
            <div className={styles.item2}> BOX </div>
            <div className={styles.item}> BOX </div>
            <div className={styles.item2}> BOX </div>

            <div className={styles.item}> BOX </div>
            <div className={styles.item2}> BOX </div>
            <div className={styles.item}> BOX </div>
            <div className={styles.item2}> BOX </div>
        </div>
    );   
}