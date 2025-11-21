"use client"; // needed for interactivity (state, events, etc.)
import Image from 'next/image'
import { useState } from "react";
import styles from '@/styles/components/PortfolioComponents.module.css'



// expects params to include:
//  - a background image
//  - an alternative image
//  - an image width and height
//  - text styling
//  - image styling
export default function Hero_Section({params}) {
    if (params) {
        return (
            <>
                <Image
                    src={params.img}
                    alt={params.alt || "Image loading failed"}
                    width={params.width}
                    height={params.height}
                />
                <div style={params.styling}>
                    {params.title}
                </div>
            </>
            
        );
    } else {
        return (
            <div>
                ERROR: No parameters given
            </div>
        );
    }
    
}