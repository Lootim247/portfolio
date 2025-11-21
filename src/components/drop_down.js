"use client"; // needed for interactivity (state, events, etc.)
import { useState } from "react";
import styles from '@/styles/components/CustomDropdown.module.css'

export default function CustomDropdown({options, placeholder, on_select}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.content_drop}>
      <button
        className={styles.button}
        onClick={() => setOpen(!open)}
      >
        {placeholder} ⌄
      </button>

      {open && (
        <ul className={styles.list}>
          {options.map((option) => (
            <li
              key={option}
              className={styles.option}
              onClick={() => {
                on_select(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
