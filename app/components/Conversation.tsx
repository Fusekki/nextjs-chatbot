"use client";

import React, { useState, useRef } from 'react';
import { Blurp, BlurpSenderType } from '../types';
import TextBox from "./textBox";
import { timeOfDay } from '../utility';
import { mongoid } from 'mongoid-js';

const Conversation = () => {

    const initialBlurps: Blurp[] = [
        {
            id: mongoid(),
            source: BlurpSenderType.Bot,
            message: `Good ${timeOfDay}! May I help you?`
        }
    ];

    const [blurps, setBlurps] = useState<Array<Blurp>>(initialBlurps);
    const [typing, setTyping] = useState(false);

    const conversationAreaRef = useRef<HTMLDivElement | null>(null);


    const scrollToBottom = () => {
        setTimeout(() => {
            if (conversationAreaRef.current && conversationAreaRef.current.scrollHeight !== undefined) {
                conversationAreaRef.current.scrollTop = conversationAreaRef.current.scrollHeight;
            }
        }, 0)
    }

    const onStateChange = (newState: Blurp) => {
        setBlurps([...blurps, newState])
        console.log(newState)
        if (newState.source === BlurpSenderType.User) {
            setTyping(true);
            setTimeout(() => {
                setTyping(false);
            }, 5000);
        } else {
            setTyping(false)
        }
    };

    return (
        <>
            <div className="message-box flex flex-col w-<5/7> overflow-y-auto  px-8 w-full h-full justify-end"
                ref={conversationAreaRef}
            >
                {blurps.map(m => (
                    m.source === "bot" ? (
                        <div
                            key={m.id}
                            className="inline-block self-start relative bg-green-300 mxy-1.5 px-4 py-2 my-2 rounded-3xl max-w-3xl"
                        >{m.message}</div>
                    ) :
                        (
                            <div
                                key={m.id}
                                className="inline-block self-end relative bg-blue-300 mxy-1.5 px-4 py-2 my-2 rounded-3xl max-w-3xl"
                            >{m.message}</div>
                        )

                ))}
                {typing && (<div className="inline-block self-start relative bg-green-300 mxy-1.5 px-4 py-2 rounded-3xl typing-animation w-[75px] h-[40px]"></div>)}
            </div>
            <div className="w-full flex justify-center items-end">
                <TextBox setBlurps={setBlurps} blurps={blurps} onChange={scrollToBottom} onStateChange={onStateChange} />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded h-12 absolute bottom-4 right-5 overflow-y-auto"
                >
                    <span className="material-icons material-symbols-outlined">arrow_upward</span>
                </button>
            </div>
        </>
    )

}

export default Conversation;
