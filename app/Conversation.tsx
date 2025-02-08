"use client";

import { useState, useRef } from 'react';
import { Blurp, BlurpSenderType } from './types';
import TextBox from "./textBox";

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

    // console.log(time);
    const [blurps, setBlurps] = useState<Array<Blurp>>(initialBlurps);
    const conversationAreaRef = useRef<HTMLDivElement | null>(null);

    let typingAnimation = true;

    const scrollToBottom = () => {
        setTimeout(() => {
            if (conversationAreaRef.current && conversationAreaRef.current.scrollHeight !== undefined) {
                conversationAreaRef.current.scrollTop = conversationAreaRef.current.scrollHeight;
                typingAnimation = true;
                console.log('hgere!')
                console.log(blurps)
                // console.log(typingAnimation)
            }
        }, 0)
    }

    return (
        <>
            <div className="message-box flex flex-col w-<5/7> overflow-y-auto  px-8 w-full h-full justify-end"
                ref={conversationAreaRef}
            // style={{
            //     // maxHeight: '520px',
            //     // bottom: '120px',
            //     // overflowY: 'auto',
            //     // marginTop: '10px'
            // }}
            >
                {/* <div className='lala flex flex-col w-[95%] bg-slate-200  mx-auto h-full'> */}
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
                {/* </div> */}
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
