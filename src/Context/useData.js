import { getDatabase } from "firebase/database";
import { useState } from "react";
import initializeFirebase from "../Firebase/firebase.init";

initializeFirebase();


const useData = () => {
    const [taskList, setTaskList] = useState([]);

    return [
        taskList,
        setTaskList,
    ];
}

export default useData;