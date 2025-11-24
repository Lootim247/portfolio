"use client";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from '@/styles/components/PortfolioComponents.module.css'

export default function Title({ params }) {
    const router = useRouter();

    if (!params) {
        return <div>ERROR: No parameters given</div>;
    }

    return (
        <div className={styles.top_row}>
            {/* Back button */}
            <button 
                className={styles.title_button} 
                onClick={() => router.back()}
            >
                <Image 
                    src="/icons/back.svg"
                    alt="Back"
                    width={40}
                    height={40}
                />
            </button>

            {/* Title container */}
            <div className={styles.container}>
                <div className={styles.title}>{params.text}</div>
                <div className={styles.subtitle}>{params.subtext}</div>
            </div>

            {/* Conditional GitHub button */}
            {params.github && (
                <a 
                    href={params.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.title_button}
                >
                    <Image
                        src="/icons/github.svg"
                        alt="GitHub"
                        width={60}
                        height={60}
                    />
                </a>
            )}
        </div>

    );
}
