"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextAlignJustify, ChevronDown, ChevronLeft, ChevronRight, Info, X, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "../styles/main_layout.module.css";

type FileInfo = {
  url: string;
  displayName: string;
  icon?: ReactNode;
  description?: string;
};

const files: Record<string, FileInfo> = {
  // HOME KEY SHOULD BE NONE
  "": { 
    url: "/",
    displayName: "README.md",
    icon: <Info size={16} color="#6495ED"/>,
    description: "Portfolio home page",
  },

  "Resume.pdf": {
    url: "/resume",
    displayName: "Resume.pdf",
    icon: <FileText size={16} color="#EB1000"/>,
    description: "My current resume",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // mobile hamburger open state
  const [open, setOpen] = useState(false);
  
  // ensure state initiated correctly when visiting non-home first
  const pathname = usePathname();
  const activeFile = Object.values(files).find(
    (info) => info.url === pathname
  );
  const [fileName, setFileName] = useState(activeFile ? 
    activeFile.displayName :
    "README.md"
  );

  return (
    <>
      <div className={styles.topHeader}>
        <div className={styles.logo}>
          <ChevronLeft/>
          <span>TIM</span>
          <span style={{fontSize:25}}>/</span>
          <span>P</span>
          <ChevronRight/>
        </div>
        . . .

        <a className={styles.hamburgerMenu}
          onClick={()=>setOpen(!open)}>
            <TextAlignJustify className={styles.UI}/>
        </a>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sideBar}>
          <div>
            <ChevronDown size={20} />
            portfolio_website
          </div>

          <div className={styles.sideBarContainer}>
          {Object.entries(files).map(([key, info]) => {
            return (
              <Link
                key={key}
                href={info.url}
                className={`${styles.sideBarButton} ${
                  fileName === info.displayName
                    ? styles.activeSideBarButton
                    : ""
                }`}
                onClick={() => setFileName(info.displayName)}
              >
                {info.icon}
                {info.displayName}
              </Link>
            );
          })}
          </div>

          <div className={styles.sideBarFooter}>
            <Link href="https://github.com/Lootim247" target="_blank" className={styles.footerLink}>
              <FaGithub className={styles.icon}/>
            </Link>
            <Link href="https://www.linkedin.com/in/tim-panilaitis-24810a332/" target="_blank" className={styles.footerLink}>
              <FaLinkedin className={styles.icon}/>
            </Link>
          </div>
        </div>

        <div className={styles.openFileContainer}>
          <div className={styles.openFileHeader}>
            {fileName}
            <Link href="/" onClick={() => setFileName(files[""].displayName)}><X size={14}/></Link>
          </div>

          <main className={styles.childContentContainer}>
            {children}
          </main>
        </div>


        { open && 
        <div className={styles.mobileSideBar}>
          <div className={styles.sideBarContainer}>
            <div>
              <ChevronDown size={20} />
              portfolio_website
            </div>
            {Object.entries(files).map(([key, info]) => {
              return (
                <Link
                  key={key}
                  href={info.url}
                  className={`${styles.sideBarButton} ${
                    fileName === info.displayName
                      ? styles.activeSideBarButton
                      : ""
                  }`}
                  onClick={() => {setFileName(info.displayName); setOpen(false)}}
                >
                  {info.icon}
                  {info.displayName}
                </Link>
              );
            })}
          </div>

          <div className={styles.mobileSideBarFooter}>
            <Link href="https://github.com/Lootim247" target="_blank" className={styles.footerLink}>
              <FaGithub className={styles.icon}/>
            </Link>
            <Link href="https://www.linkedin.com/in/tim-panilaitis-24810a332/" target="_blank" className={styles.footerLink}>
              <FaLinkedin className={styles.icon}/>
            </Link>
          </div>
        </div>
        }

      </div>
    </>
  );
}