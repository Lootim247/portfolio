"use client"; // needed for interactivity (state, events, etc.)
import { useState } from "react";
import styles from '@/styles/components/PortfolioComponents.module.css'

// expects params to include:
//  - a background image
//  - an alternative image
//  - an image width and height
//  - image location {left, right, above, below, left-indented, right-indented}
//  - text styling
//  - image styling
export default function Text_Image_Section({params}) {
    if (params) {
        switch(params.image_loc) {
            case "left":
            case "right":
            case "above":
            case "below":
            case "left-indented":
            case "right-indented":
        }
    } else {
        return (
            <div>
                ERROR: No parameters given
            </div>
        );
    }
}