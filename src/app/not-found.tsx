import Link from 'next/link'
import styles from '@/styles/notFound.module.css'

export default function NotFound() {
  return (
    <main className={styles.page}>
      <h2>404 - Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </main>
  )
}