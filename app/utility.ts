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

export const timeOfDay = getTimeOfDay();
