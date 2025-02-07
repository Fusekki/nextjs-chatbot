"use client";

import { useState, useRef } from 'react';
import { Blurp, BlurpSenderType } from './types';
import TextBox from "./textBox";
import { Truculenta } from 'next/font/google';

const Conversation = () => {

    const getTimeOfDay = () => {
        const now = new Date();
        const hours = now.getHours();
        if (hours < 12) {
            return "morning";
        } else if (hours < 18) {
            return "afternoon";
        } else {
            return "evening";
        }
    }

    const time = getTimeOfDay();

    const initialBlurps: Blurp[] = [
        {
            id: 1,
            source: BlurpSenderType.Bot,
            message: `Good ${getTimeOfDay()}! May I help you?`
        },
        // {
        //     id: 2,
        //     source: BlurpSenderType.User,
        //     message: 'Hi I need help'
        // },
        // {
        //     id: 3,
        //     source: BlurpSenderType.Bot,
        //     message: 'Sure. What may I help you with?'
        // },
        // {
        //     id: 4,
        //     source: BlurpSenderType.User,
        //     message: 'What is 2 + 2?'
        // },
    ];

    console.log(time);
    const [blurps, setBlurps] = useState<Array<Blurp>>(initialBlurps);
    const conversationAreaRef = useRef<HTMLDivElement | null>(null);

    let typingAnimation = true;

    const scrollToBottom = () => {
        setTimeout(() => {
            if (conversationAreaRef.current && conversationAreaRef.current.scrollHeight !== undefined) {
                conversationAreaRef.current.scrollTop = conversationAreaRef.current.scrollHeight;
                console.log('here!!')
                typingAnimation = true;
                console.log(typingAnimation)
            }
        }, 0)
    }

    async function sendMessage(message: string) {
        console.log('sending message:', message);

        // const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
        //     method: 'POST',
        //     body: JSON.stringify({ productId }),
        //     headers: {
        //         contentType: 'application/json'
        //     }
        // });
        // const updatedCartProducts = await response.json();
        // console.log('Updated cart products:', updatedCartProducts);

        const newMessage: Blurp = {
            id: blurps.length + 1,
            source: BlurpSenderType.User,
            message: message
        }
        setBlurps(prevMessages => prevMessages.concat(newMessage));
        console.log(blurps)
        // typingAnimation = true;

    }

    return (
        <>
            <div className="message-box w-full flex flex-col py-3 overflow-y-auto bg-red-300"
                ref={conversationAreaRef}
                style={{
                    // maxHeight: '520px',
                    bottom: '120px',
                    width: '100vh',
                    overflowY: 'auto',
                    marginTop: '10px'
                }}
            >
                {blurps.map(m => (
                    m.source === "bot" ? (
                        <div
                            key={m.id}
                            className="inline-block self-start relative bg-green-300 mxy-1.5 px-4 py-2 my-2 rounded-3xl"
                        >{m.message}</div>
                    ) :
                        (
                            <div
                                key={m.id}
                                className="inline-block self-end relative bg-blue-300 mxy-1.5 px-4 py-2 my-2 rounded-3xl"
                            >{m.message}</div>
                        )

                ))}
                {typingAnimation && (<div className="inline-block self-start relative bg-green-300 mxy-1.5 px-4 py-2 rounded-3xl typing-animation w-[75px] h-[40px]"></div>)}
            </div>
            <div className="w-full flex justify-center items-end">
                <TextBox setBlurps={setBlurps} blurps={blurps} onChange={scrollToBottom} />
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
