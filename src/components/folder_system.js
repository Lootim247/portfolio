"use client"; // needed for interactivity (state, events, etc.)
import { useState, useEffect } from "react";
import Image from 'next/image';
import { useMemo } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/components/FolderSystem.module.css'
import CustomDropdown from "./drop_down";

// class for ease of rendering later
function Node({ id, name, type, path, nav_to, link }) {
  const router = useRouter();
  const new_path = [...path, { id, name }];

  let icon = null;
  if (type === "folder") {
    icon = "/icons/folder.svg";
  } else {
    icon = "/icons/file2.svg";
  }

  const handleClick = () => {
    if (type === "folder") {
      nav_to(new_path);
    } else if (link) {
      router.push(link);
    }
  };

  return (
    <div className={styles.node} onClick={handleClick}>
      <Image src={icon} alt={type} width={24} height={24} />
      <div className={styles.node_title}>{name}</div>
    </div>
  );
}


export default function FolderSystem( {fileJSON, filter_bars} ) {
    // keep track of current path, as well as the node and its children
    let json_data = addAttrIds(fileJSON);
    
    const root = {
        name: json_data.name,
        children: json_data.children,
        type: json_data.type
    };

    const [curr_path, set_path] = useState([{id: json_data.id, name: json_data.name}]);
    const [arr, set_arr] = useState(root.children);
    const [in_search, set_in_search] = useState(false)
    const [attributes, set_attributes] = useState([])

    function addAttrIds(node, prefix = "") {
        const id = prefix ? `${prefix}-${node.name}` : node.name;
        node.attributes = Array.isArray(node.attributes) ? node.attributes : [];
        node.id = id;
        if (node.children) {
            node.children.forEach((child, index) => {
                addAttrIds(child, `${id}-${index}`);
                node.attributes = [...node.attributes, ...child.attributes]
            })
            node.attributes = [...new Set(node.attributes)]
        }

        return node;
    }

    function filter (arr = [], name = null, attributes = []) {
        console.log(attributes)
        let filtered = []    
        arr.forEach((node) => {
            const name_Match = name === null || node.name === name
            const nodeAttrs = Array.isArray(node.attributes) ? 
                node.attributes : [];
            const attrs_Match =
                !attributes || attributes.length === 0
                ? true
                : attributes.every((attr) => nodeAttrs.includes(attr));
            
            if (name_Match && attrs_Match) {
                filtered.push(node)
            }
        })
        return filtered
    }

    function search (name) {
        set_in_search(true)
        set_arr(search_helper(root, name).sort((a, b) => a.rank - b.rank))
    }

    function search_helper (node, name) {
        let filtered = []
        node.children.forEach((child)=>{
            if (child.type === "folder") {
                filtered = [...filtered, ...search_helper(child, name, attributes)]
            }
            else if (child.name !== null && child.name === name) {
                if (attributes.every(elem => child.attributes.includes(elem.name))) {
                    filtered.push(child)
                }
            }
        })
    }

    // navigate to
    function nav_to (path) {
        set_path(path)
        let curr_JSON = json_data
        path.slice(1).forEach(level => {
            curr_JSON = curr_JSON.children.find(obj => obj.id === level.id)
        });
        set_arr(curr_JSON.children)
    } 

    function updateAttribute(value, action) {
        set_attributes(prev => {
            // add attribute
            if (action === "a") {
            return prev.includes(value) ? prev : [...prev, value];
            // remove attribute
            } else if (action === "r") {
            return prev.filter(attr => attr !== value);
            } else {
            return prev;
            }
        });
    }


    let items = filter(arr, null, attributes)

    return (
        <div className={styles.outer}>
        <div className={styles.search}>
            <div 
            className={styles.search_icon}
            onClick={()=>{search(name)}}></div>
            <div className={styles.input_box}></div>
        </div>
        
        {/* Build the branch bar for easier routing */}
        <div className={styles.bar}>
            {(() => {
                const maxLength = 6;
                let displayPath = [];

                if (curr_path.length <= maxLength) {
                displayPath = curr_path.map((node, i) =>
                    i === curr_path.length - 1 ? `${node.name}:` : `${node.name} > `
                );
                } else {
                displayPath = [
                    `${curr_path[0].name} > `,
                    "... > ",
                    ...curr_path.slice(-5, -1).map(node => `${node.name} > `),
                    `${curr_path[curr_path.length - 1].name}:`
                ];
                }

                return curr_path.map((node, index) => (
                <div
                    key={node.id}
                    className={styles.bar_item}
                    onClick={() => nav_to(curr_path.slice(0, index + 1))}
                >
                    {displayPath[index]}
                </div>
                ));
            })()}
        </div>


        {/* If filter bars is populated render */}
        {filter_bars && 
        <div className={styles.filter_bar}>
            {filter_bars.map((bar, i) => (
                <CustomDropdown
                key={i} 
                options={bar.options} 
                on_select={(value, action) => updateAttribute(value, action)}
                placeholder={bar.placeholder}/>
            ))}
        </div>
        }

        <div className={styles.container}>
            {items.length == 0 ? <p>No Results</p> :
            items.map((child) => (
                <Node
                    key={child.id}
                    id={child.id}
                    name={child.name} 
                    type={child.type} 
                    path={curr_path}
                    nav_to={nav_to}
                    link={child.type == "folder" ? null : child.link}
                />
            ))}
        </div>
        </div>
    );
}
