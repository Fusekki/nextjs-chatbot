"use client";

import React, {
    useState, useEffect, useRef, ChangeEvent, Dispatch, SetStateAction
} from 'react';
import { Blurp, BlurpSenderType } from '../types';
import { timeOfDay } from '../utility';
import { ObjectId } from 'bson';

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
                composeBlurp();
            }
        }
    }

    const composeBlurp = () => {
        const messageText = textareaRef.current!.value
        const newBlurp: Blurp = {
            id: new ObjectId().toString(),
            source: BlurpSenderType.User,
            message: messageText
        }
        setLocalState([...blurps, newBlurp]);
        onStateChange(newBlurp)
        onChange();
        sendBlurp(messageText)
        setText('');
    }

    async function sendBlurp(message: string) {
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
                    id: new ObjectId().toString(),
                    source: BlurpSenderType.Bot,
                    message: msg
                }
                setTimeout(() => {
                    setBlurps(prevMessages => prevMessages.concat(newMessage));
                }, 5000);
            })
    }

    return (
        <div className="flex w-full justify-center items-center align-center mx-auto ">
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                className="text-black w-9/12 border border-gray-300 p-2 rounded-lg drop-shadow-2xl h-full box-content overflow-hidden resize-none"
                placeholder="Message Hal..."
                onKeyDown={handleKeyDown}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 ml-[10px] rounded h-12 overflow-y-auto"
            >
                <span className="material-icons material-symbols-outlined" onClick={composeBlurp}>arrow_upward</span>
            </button>
        </div>
    );

}

export default TextBox;
