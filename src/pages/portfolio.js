// src/pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'
import styles from '../styles/Resume.module.css'

export async function getStaticProps() {
  const resumePath = path.join(process.cwd(), 'src', 'data', 'resume_info.json')
  const linksPath = path.join(process.cwd(), 'src', 'data', 'link_manager.json')

  const resumeRaw = fs.existsSync(resumePath) ? fs.readFileSync(resumePath, 'utf8') : 'null'
  const linksRaw = fs.existsSync(linksPath) ? fs.readFileSync(linksPath, 'utf8') : 'null'

  let resumeData = null
  let linkData = null

  try { resumeData = JSON.parse(resumeRaw) } catch (e) { resumeData = null }
  try { linkData = JSON.parse(linksRaw) } catch (e) { linkData = null }

  return {
    props: {
      resumeData,
      linkData
    }
  }
}

export default function Home({ resumeData, linkData }) {
  if (!resumeData || !linkData) {
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

  const contact = resumeData.contact || {}
  const education = resumeData.education || {}
  const technical = resumeData.technical_skills || {}
  const projects = resumeData.project_experience || []
  const work = resumeData.work_experience || []
  const interests = resumeData.interests || []

  const makeLink = (keyOrText) => {
    // Maps names/titles to URLs; fallback to '#' if missing
    return linkData[keyOrText] || '#'
  }

  return (
    <div>Hello!</div>
  )
}
