"use client";

import React, {
    useState, useEffect, useRef, ChangeEvent, Dispatch, SetStateAction
} from 'react';
import { Blurp, BlurpSenderType } from './types';
import { timeOfDay } from './utility';
import { v4 as uuidv4 } from 'uuid';
function TextBox({ blurps, setBlurps, onChange, onStateChange }: { blurps: Blurp[], setBlurps: Dispatch<SetStateAction<Blurp[]>>, onChange: () => void, onStateChange: (newState: Blurp) => void }) {
    const initialBlurps: Blurp[] = [
        {
            id: blurps[0].id,
            source: BlurpSenderType.Bot,
            message: `Good ${timeOfDay}! May I help you?`
        }
    ];

    const [text, setText] = useState<string>('')
    const [localState, setLocalState] = useState<Array<Blurp>>(initialBlurps);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to compute accurate scrollHeight.
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height to fit content.
        }
    }, [localState]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const textWithoutWhitespace = textareaRef.current!.value.replace(/\s/g, '');
            if (textWithoutWhitespace.length > 0) {
                const messageText = textareaRef.current!.value
                const newBlurp: Blurp = {
                    id: uuidv4(),
                    source: BlurpSenderType.User,
                    message: messageText
                }
                setLocalState([...blurps, newBlurp]);
                onStateChange(newBlurp)
                onChange();
                sendMessage(messageText)
            }
            setText('');
        }
    }

    async function sendMessage(message: string) {
        const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message }),
            headers: {
                contentType: 'application/json'
            }
        });
        await response.json()
            .then((msg) => {
                const newMessage: Blurp = {
                    id: uuidv4(),
                    source: BlurpSenderType.Bot,
                    message: msg
                }
                setTimeout(() => {
                    setBlurps(prevMessages => prevMessages.concat(newMessage));
                }, 5000);
            })
    }


    return (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            className="w-9/12 border border-gray-300 p-2 rounded-lg drop-shadow-2xl h-full box-content overflow-hidden resize-none absolute bottom-8"
            placeholder="Message Hal..."
            onKeyDown={handleKeyDown}
        />
    );

}

export default TextBox;
