"use client"; // needed for interactivity (state, events, etc.)

import { useState, useEffect } from "react";
import styles from '@/styles/components/FolderSystem.module.css'
import CustomDropdown from "./drop_down";

function Node( {id, name, type, path, nav_to} ) {
    const new_path = [...path, {id: id, name: name}]

    let icon = null
    if (type === "folder") {
        icon = null
    } else {
        icon = null
    }

    return (
        <div className={styles.node} onClick={() => type === "folder" && nav_to(new_path)}>
            <div className={styles.node_icon}> 
                {icon}
            </div>
            <div className={styles.node_title}> {name} </div>
        </div>
    );
}

export default function FolderSystem( {fileJSON} ) {
    // keep track of current path, as well as the node and its children
    let json_data = addAttr(addIds(fileJSON));
    
    const root = {
        name: json_data.name,
        children: json_data.children,
        type: json_data.type
    };

    const [curr_path, set_path] = useState([{id: json_data.id, name: json_data.name}]);
    const [arr, set_arr] = useState(root.children);
    const [in_search, set_in_search] = useState(false)
    const [attributes, set_attributes] = useState([])

    function addIds(node, prefix = "") {
        const id = prefix ? `${prefix}-${node.name}` : node.name;
        node.id = id;

        if (node.children) {
            node.children.forEach((child, index) => {
                addIds(child, `${id}-${index}`);
            });
        }

        return node;
    }

    function addAttr(node) {
        node.attributes = Array.isArray(node.attributes) ? node.attributes : [];
        if (node.children) {
            node.children.forEach((child) => {
                addAttr(child)
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

    return (
        <div className={styles.outer}>
        <div className={styles.search}>
            <div 
            className={styles.search_icon}
            onClick={()=>{search(name)}}></div>
            <div className={styles.input_box}></div>
        </div>
            
        <div className={styles.bar}>
            {curr_path.reduce((acc, node, index) => {
                // accumulate the path up to this node
                const new_path = curr_path.slice(0, index + 1);  
                let displayPath = [];

                if (curr_path.length <= 6) {
                    displayPath = curr_path.map(
                        (obj, i) => i === curr_path.length - 1 ? 
                                                        obj.name + ":" :  
                                                        obj.name + " > ");
                } else {
                    displayPath = [
                        curr_path[0].name + " > ",
                        "... > ",
                        curr_path[curr_path.length - 5].name + " > ",
                        curr_path[curr_path.length - 4].name + " > ",
                        curr_path[curr_path.length - 3].name + " > ",
                        curr_path[curr_path.length - 2].name + " > ",
                        curr_path[curr_path.length - 1].name + ":"
                    ];

                    for (i in curr_path.length - 7) {
                        displayPath.splice(2, 0, "")
                    }
                }

                // push JSX element
                acc.push(
                <div
                    key={node.id}
                    className={styles.bar_item}
                    onClick={() => nav_to(new_path)}
                >
                    {displayPath[index]}
                </div>
                );

                return acc;
            }, [])}
        </div>

        <div className={styles.filter_bar}>
            <div> 
                <CustomDropdown 
                    options={["c++", "python"]} 
                    on_select={(value) =>
                        set_attributes(prev => prev.includes(value) ? prev : [...prev, value])
                    }
                    placeholder={"Languages"}/>
        
            </div>
        </div>
            
        <div className={styles.container}>
            {filter(arr, null, attributes).map((child) => (
                <Node
                    key={child.id}
                    id={child.id}
                    name={child.name} 
                    type={child.type} 
                    path={curr_path}
                    nav_to={nav_to}
                />
            ))}
        </div>
        </div>
    );
}
