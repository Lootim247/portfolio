// src/pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/pages/Home.module.css'
import Tab_Header from '@/components/tab_bar'

const home_data = {
  "position_title" : "Tufts School of Engineering Computer Science Undergraduate",
  "headshot_path" : "/elementor-placeholder-image.png",
  "github" : "https://github.com/Lootim247",
  "linkedIn" : "https://linkedin.com/in/tim-panilaitis-24810a332/",
  "gmail" : "mailto:tpanilai@gmail.com",
  "description" : `Timothy Panilaitis is a Computer Science student at the Tufts School of Engineering, with interests in machine learning, computer vision, and robotics. His coursework has strengthened his skills in algorithm design, programming, and system integration, while his Human Factors Engineering minor has given him tools to better understand user needs and design solutions around them.

  He is currently a research assistant working on a vector-based local navigation system, aiming to enable a robot to autonomously move between floors using an elevator. He also serves as a teaching assistant, mentoring students in web development and database management tools, while refining his own programming skills through independent projects. Beyond the classroom, he works as a Campus Center Manager at Tufts, ensuring smooth operations and supporting student needs.

  Looking forward, Timothy is seeking a summer internship where he can apply his technical skills, expand his knowledge in real-world settings, and grow as a developer.

  Outside of academics, he enjoys crocheting, soccer, cooking, and skiing.`
}

export default function Home() {

  const router = useRouter()
  const makeLink = (keyOrText) => {
    // Maps names/titles to URLs; fallback to '#' if missing
    return linkData[keyOrText] || '#'
  }

  return (
    <>
      <div className={styles.full}>
        <Head>
          <title>Timothy Panilaitis — Home</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <div className={styles.content}>
          <Tab_Header/>
        

          <div className={styles.headshot_row}>
            {/* headshot and title */}
            <div className={styles.title}>
              <div className={styles.name_title}>
                Timothy Panilaitis
              </div>
              <div className={styles.position_title}>
                {home_data["position_title"] || 'ERROR: position_title not specified'}
              </div>
            </div>

            <div className={styles.headshot}>
              <Image
                src={home_data["headshot_path"]}
                alt="Timothy Panilaitis Headshot"
                width={200}
                height={200}
                className={styles.headshot_image}
              />
            </div>
          </div>

          <div>
            {/* description of me */}
            <div className={styles.description}>
              {home_data["description"] || 'ERROR: description not specified'}
            </div>
          </div>

          <div className={styles.link_row}>
            <a href={home_data.github} target="_blank">
              <Image src={"icons/github.svg"} alt={""} width={60} height={60}/>
            </a>
            <a href={home_data.linkedIn} target="_blank">
              <Image src={"icons/linkedin.svg"} alt={""} width={60} height={60}/>
            </a>
            <a href={home_data.gmail} target="_blank">
              <Image src={"icons/mail2.svg"} alt={""} width={60} height={60}/>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
