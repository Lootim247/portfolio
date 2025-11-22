"use client"; // needed for interactivity (state, events, etc.)
import { useState } from "react";
import styles from '@/styles/components/PortfolioComponents.module.css'


// expects params to include:
//  - text
export default function Title({params}) {
    if (params) {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    {params.text}
                </div>
                <div className={styles.subtitle}>
                    {params.subtext}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                ERROR: No parameters given
            </div>
        );
    }
}