import styles from "../styles/page.module.css";
import Image from "next/image";
import profilePic from '../../public/me.jpeg'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.titleContainer}>
        <Image
          src={profilePic}
          alt="User Profile"
          placeholder="blur"
          className={styles.profilePic}
        />

        <div className={styles.titleDescriptionContainer}>
          <span className={styles.textTitle}>
            #Timothy Panilaitis
          </span>

          <span>
            I always enjoyed legos because of all the things I could create. Now I love Computer Science for that same reason.
          </span>

          <span className={styles.textHeader2}>
            Software Engineer | ML Engineer | Data Analyst
          </span>

        </div>
      </div>

      <div className={styles.groupDiv}>
        <span className={styles.textHeader2}>About Me</span>
        <span>
          I am a Spring 2027 Tufts School of Engineering Graduate, who has built a widespread base of knowledge in robotics, web development, data analysis, machine learning, and computer vision. I enjoy architecting complex systems and ensuring their success.
        </span>
      </div>

      <div className={styles.groupDiv}>
        <span className={styles.textHeader2}>Looking for work!</span>
        <span> If you are looking for a capable software engineer you are in luck, I am looking for work! I am interested in all walks of software engineering with particular interest in testing systems, machine learning and computer vision, and algorithmic work. I am seeking a colaborative work environment or mentorship based program. If that sounds perfect to you, let me know! </span>
      </div>
    </div>
  );
}
