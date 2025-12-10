"use client";

import React, { useState, useRef } from 'react';
import { Blurp, BlurpSenderType } from '../types';
import TextBox from "./textBox";
import { timeOfDay } from '../utility';
import { ObjectId } from 'bson';
import Box from '@mui/material/Box';

const Conversation = () => {

    const initialBlurps: Blurp[] = [
        {
            id: new ObjectId().toString(),
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
            <div className="message-box flex flex-col  overflow-y-auto w-[85%]  h-[calc(100% - 45px] mb-[4rem] justify-end"
                ref={conversationAreaRef}
            >
                {blurps.map(m => (
                            <Box key={m.id}
                                sx={{
                                    padding: 1,
                                    borderRadius: '15px',
                                    maxWidth: '65%',
                                    backgroundColor: m.source === 'bot' ? 'green' : 'blue',
                                    alignSelf: m.source === 'bot' ? 'flex-start' : 'flex-end',
                                    margin: '5px',
                                }}
                                >
                                {m.message}
                                </Box>
                //     m.source === "bot" ? (
                //         <div
                //             key={m.id}
                //             className="inline-block self-start relative bg-green-300 mxy-1.5 px-4 py-2 my-2 rounded-3xl max-w-3xl"
                //         >{m.message}</div>
                //     ) :
                //         (
                //             <div
                //                 key={m.id}
                //                 className="inline-block self-end relative bg-blue-300 mxy-1.5 px-4 py-2 my-2 rounded-3xl max-w-3xl"
                //             >{m.message}</div>
                //         )

                ))}
                {typing && (<div className="inline-block self-start relative bg-green-300 mxy-1.5 px-4 py-2 rounded-3xl typing-animation w-[75px] h-[40px]"></div>)}
            </div>
            <div className="w-full flex justify-center items-end">
                <TextBox setBlurps={setBlurps} blurps={blurps} onChange={scrollToBottom} onStateChange={onStateChange} />
            </div>
        </>
    )

}

export default Conversation;
