"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

function TextBox() {
    const [value, setValue] = useState<string>('')
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to compute accurate scrollHeight.
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height to fit content.
        }
    }, [value]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            style={{
                // resize: 'none', // Prevent manual resizing
                // overflowY: "scroll",
                // paddingRight: "17px", /* Increase/decrease this value for cross-browser compatibility */
                // boxSizing: "content-box" /* So the width will be 100% + 17px */
            }}
            className="w-full border border-gray-300 p-2 rounded-lg drop-shadow-2xl h-full box-content  overflow-hidden resize-none"
        />
    );
}

export default TextBox;