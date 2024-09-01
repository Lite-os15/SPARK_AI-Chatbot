import { getChats } from "./Database";


const datatoAPI = () => {
    const getData = getChats();

    const process = getData.slice(0,10).map(({ role, content }) => ({ role, content }));
    // const userInputs = getData.filtered('role = "user"').sorted('timestamp', true).slice(0, 5).map(({ role, content }) => ({ role, content }));
    // const assistantReplies = getData.filtered('role = "assistant"').sorted('timestamp', true).slice(0, 5).map(({ role, content }) => ({ role, content }));
    // const combinedArray = [...userInputs, ...assistantReplies].sort((a, b) => a.timestamp - b.timestamp);
    return process;
};

export {datatoAPI};