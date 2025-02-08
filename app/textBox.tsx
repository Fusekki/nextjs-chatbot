"use client";
import React, {
    useState, useEffect, useRef, ChangeEvent, Dispatch, SetStateAction
} from 'react';
import { Blurp, BlurpSenderType } from './types';

function TextBox({ blurps, setBlurps, onChange }: { blurps: Blurp[], setBlurps: Dispatch<SetStateAction<Blurp[]>>, onChange: () => void }) {
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

    const handleKeyDown = (e) => {
        // if (e.key === 'Enter' && textareaRef.current?.value) {
        if (e.key === 'Enter') {
            // console.log(textareaRef.current?.value.length);
            e.preventDefault();
            const textWithoutWhitespace = textareaRef.current!.value.replace(/\s/g, '');
            // console.log(textWithoutWhitespace.length)
            if (textWithoutWhitespace.length > 0) {
                const newBlurp: Blurp = {
                    id: blurps.length + 1,
                    source: BlurpSenderType.User,
                    message: textareaRef.current!.value
                }
                // console.log(newBlurp)
                // console.log(blurps.length)
                setBlurps([...blurps, newBlurp]);
                // console.log(blurps)
                onChange();
            }
            setValue('');
        }
    }

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            className="w-9/12 border border-gray-300 p-2 rounded-lg drop-shadow-2xl h-full box-content overflow-hidden resize-none absolute bottom-8"
            placeholder="Message Hal..."
            onKeyDown={handleKeyDown}
        />
    );
}

export default TextBox;
