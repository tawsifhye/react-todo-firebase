import { useState } from "react";

const useData = () => {
    const [taskList, setTaskList] = useState([]);

    return [
        taskList,
        setTaskList,
    ];
}

export default useData;