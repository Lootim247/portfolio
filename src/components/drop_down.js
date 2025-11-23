"use client"; // needed for interactivity (state, events, etc.)
import { useState } from "react";
import styles from '@/styles/components/CustomDropdown.module.css'

export default function CustomDropdown({options, placeholder, on_select}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null)

  function onDropClick() {
    if (selected) {
      on_select(selected, "r")
      setSelected(null)
    } else {
      setOpen(!open)
    }
  }

  return (
    <div className={styles.content_drop}>
      <button
        className={`${styles.button} ${selected ? styles.selected : ''}`}
        onClick={() => onDropClick()}
      >
        {selected ?  selected  + "  X" : placeholder + "  ⌄"}
      </button>

      {open && (
        <ul className={styles.list}>
          {options.map((option) => (
            <li
              key={option}
              className={styles.option}
              onClick={() => {
                on_select(option, "a");
                setOpen(false);
                setSelected(option)
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
