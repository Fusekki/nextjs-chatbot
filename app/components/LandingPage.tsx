import Conversation from './Conversation';

const LandingPage = () => {

    return (
        <div className="h-[calc(100vh-30px)]">
            <h1 className="font-bold text-3xl text-x1/8 mx-2">AI Chatbot</h1>
            <div style={{ height: 'calc(100% - 100px)' }} className="flex flex-col items-center justify-end bg-slate-300">
                <div className="flex flex-col mx-auto items-center h-full justify-end w-full">
                    <Conversation />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
