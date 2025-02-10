import Conversation from './Conversation';

const LandingPage = () => {

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

    const timeOfDay = getTimeOfDay();

    return (
        <div className="h-dvh">
            <h1 className="font-bold text-3xl text-x1/8 mx-2">AI Chatbot</h1>
            <div style={{ height: 'calc(100% - 150px)' }} className="flex flex-col items-center justify-end bg-slate-300">
                <div className="flex flex-col mx-auto items-center h-full justify-end w-full">
                    {/*                    <div className="text-2xl font-medium">
                        <h2 className=""> Good {timeOfDay}! May I help you?</h2>
                    </div> */}
                    <Conversation />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
