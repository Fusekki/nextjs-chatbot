import TextBox from "./textBox";
const Dashboard = () => {

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
            <h1 className="font-bold text-3xl text-x1/8 m-2">AI Chatbot</h1>
            <div style={{ height: 'calc(100% - 36px)' }} className="flex flex-col items-center justify-center">
                <div className="flex flex-col mx-auto justify-between w-9/12 items-center bg-gray-200 space-y-32">
                    <div className="text-2xl font-medium">
                        <h2 className=""> Good {timeOfDay}! May I help you?</h2>
                    </div>
                    <div className="flex justify-center w-11/12 flex justify-center bg-gray-300">
                        <div className="w-full flex justify-center items-end">
                            <TextBox />
                            <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded h-12">
                                <span className="material-icons material-symbols-outlined">arrow_upward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Dashboard;
