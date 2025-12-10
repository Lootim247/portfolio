
"use client"; // needed for interactivity (state, events, etc.)
import Link from 'next/link'
import styles from '@/styles/components/tab_bar.module.css'


export default function Tab_Header() {

  return (
    <div className={styles.tab_header}>
        <div className={styles.tab_group_left}>
            <Link href="/" className={styles.nav_link}>Home</Link>
            <div className={styles.divider}>|</div>
            <Link href="/resume" className={styles.nav_link}>Resume</Link>
            <div className={styles.divider}>|</div>
            <Link href="/portfolio" className={styles.nav_link}>Portfolio</Link>
        </div>
        {/* <div className="tab_group_right">
            <Link href="/contact" className={styles.nav_link}>Contact</Link>
        </div> */}
    </div>
  );
}




