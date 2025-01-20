import { TextBox } from "./textBox";
const Dashboard = () => {
    const timeOfDay = getTimeOfDay();

    return (
        <div className="h-dvh">
            <h1 className="font-bold text-3xl text-x1/8">AI Chatbot</h1>
            <div style={{ height: 'calc(100% - 36px)' }} className="flex flex-col items-center justify-center">
                <div className="flex flex-col mx-auto justify-between h-3/4 w-full items-center	">
                    <div className="">
                        <h2> Good {timeOfDay}.  What can I help you with?</h2>
                    </div>
                    <div className="w-full flex justify-center">
                        <TextBox />
                    </div>
                </div>
            </div>
        </div>
    );
}

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

export default Dashboard;
