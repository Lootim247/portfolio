// src/pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import path from 'path'
import fs from 'fs'
import styles from '@/styles/pages/Portfolio.module.css'

import FolderSystem from '@/components/folder_system'
import Tab_Header from '@/components/tab_bar'

export async function getStaticProps() {
  const structurePath  = path.join(process.cwd(), 'src', 'data', 'json', 'portfolio_structure.json')
  const structureRaw = fs.existsSync(structurePath) ? fs.readFileSync(structurePath, 'utf8') : 'null'
  let structureData = null
  try { structureData = JSON.parse(structureRaw) } catch (e) { structureData = null }

  return {
    props: {
      structureData
    }
  }
}

export default function Home({ structureData }) {
  if (!structureData) {
    return (
      <div className={styles.content}>
        <Head>
          <title>Resume — Timothy Panilaitis</title>
        </Head>
        <main className={styles.pdf}>
          <h1>Data not found</h1>
          <p>Make sure <code>/data/resume_info.json</code> and <code>/data/link_manager.json</code> exist.</p>
        </main>
      </div>
    )
  }
  
  return (
  <>
    <div className={styles.background}>
      <Head>
          <title>Timothy Panilaitis — Portfolio</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.content}>
        <Tab_Header/>

          {/* Portfolio content */}
          <div className={styles.file_structure}>
            <FolderSystem fileJSON={structureData}/>
          </div>
      </div>

    </div>
  </>
    
  )
}
