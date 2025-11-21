"use client"; // needed for interactivity (state, events, etc.)
import { useState } from "react";
import styles from '@/styles/components/PortfolioComponents.module.css'


// expects params to include:
//  - text
export default function Paragraph_Section({params}) {
    if (params) {
        return (
            <div>
                {params.text}
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