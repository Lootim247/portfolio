// src/pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import {Router, useRouter} from 'next/router'
import fs from 'fs'
import styles from '@/styles/pages/Resume.module.css'
import Tab_Header from '@/components/tab_bar'

export async function getStaticProps() {
  const resumePath = path.join(process.cwd(), 'src', 'data', 'json', 'resume_info.json')
  const linksPath = path.join(process.cwd(), 'src', 'data', 'json', 'link_manager.json')

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
  
  // Routing to portfolio with filter attributes
  const router = useRouter();
  function go_portfolio(attrs) {
    router.push({
      pathname: "/portfolio",
      query: { attrs }
    });
  }

  // no resume or link data?
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
    <>
      <div className={styles.full}>
        <Head>
          <title>Timothy Panilaitis — Resume</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <div className={styles.content}>
          <Tab_Header/>

          {/* Resume content */}
          <div className={styles.pdf}>
            <div className={styles.header}>
              <h1>Timothy Panilaitis</h1>
              <div id="contact_line" className={styles.contact_line}>
                {contact.phone ? `${contact.phone} | ` : ''}{contact.email || ''}
              </div>
            </div>

            <div className={styles.sections}>

              {/* EDUCATION */}
              <section>
                <h2>EDUCATION</h2>
                <hr />
                <div className={styles.container} id="education">
                  <a className={styles.a_link_div} href={makeLink(education.school)}>
                    <div className={styles.bold_row}>
                      <div>
                        <b>{education.school || ''},</b> {education.location || ''}
                      </div>
                      <div><i>Expected, {education.expected_graduation || ''}</i></div>
                    </div>
                  </a>

                  <div>
                    <div>{education.degree || ''}{education.minor ? `, ${education.minor}` : ''}</div>
                    <div>
                      GPA: {education.gpa || ''}{Array.isArray(education.honors) && education.honors.length ? `, ${education.honors.join(', ')}` : ''}
                      <br/>
                    </div>
                    {Array.isArray(education.relevant_courses) && education.relevant_courses.length > 0 && (
                      <div>
                        <br/>
                        <b>Relevant Courses:</b>{' '}
                        {education.relevant_courses.map((c, i) => (
                          <a key={i} className={styles.a_link} href={makeLink(c)}>{c}</a>
                        )).reduce((prev, curr) => [prev, ', ', curr])}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* TECHNICAL SKILLS */}
              <section>
                <h2>TECHNICAL SKILLS</h2>
                <hr />
                <div className={styles.container} id="technical_skills">
                  <div>
                    Programming Languages:{' '}
                    {Array.isArray(technical.programming_languages) ? technical.programming_languages.map((pl, i) => (
                      <a key={i} className={styles.a_link} href={makeLink(pl)}>{pl}</a>
                    )).reduce((prev, curr) => [prev, ', ', curr]) : ''}
                  </div>
                  <div>
                    Tools & Frameworks:{' '}
                    {Array.isArray(technical.tools_and_frameworks) ? technical.tools_and_frameworks.map((t, i) => (
                      <a key={i} className={styles.a_link} href={makeLink(t)}>{t}</a>
                    )).reduce((prev, curr) => [prev, ', ', curr]) : ''}
                  </div>
                </div>
              </section>

              {/* PROJECT EXPERIENCE */}
              <section>
                <h2>PROJECT EXPERIENCE</h2>
                <hr />
                <div className={styles.container} id="project_experience">
                  {projects.map((exp, idx) => (
                    <a key={idx} className={styles.a_link_div} href={makeLink(exp.title)}>
                      <div className={styles.experience_block}>
                        <div className={styles.bold_row}>
                          <div><b>{exp.title},</b> {exp.organization}</div>
                          <div><i>{exp.dates}</i></div>
                        </div>
                        <ul>
                          {Array.isArray(exp.details) ? exp.details.map((d, i) => <li key={i}>{d}</li>) : null}
                        </ul>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* WORK EXPERIENCE */}
              <section>
                <h2>WORK EXPERIENCE</h2>
                <hr />
                <div className={styles.container} id="work_experience">
                  {work.map((exp, idx) => (
                    <a key={idx} className={styles.a_link_div} href={makeLink(exp.title)}>
                      <div className={styles.experience_block}>
                        <div className={styles.bold_row}>
                          <div><b>{exp.organization},</b> {exp.location}</div>
                          <div><i>{exp.dates}</i></div>
                        </div>
                        <div><i>{exp.title}</i></div>
                        <ul>
                          {Array.isArray(exp.details) ? exp.details.map((d, i) => <li key={i}>{d}</li>) : null}
                        </ul>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* INTERESTS */}
              <section>
                <h2>INTERESTS</h2>
                <hr />
                <div className={styles.container} id="interests">
                  {Array.isArray(interests) ? interests.join(' / ') : ''}
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
