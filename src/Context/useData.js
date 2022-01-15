import { useState } from "react";

const useData = () => {
    const [taskList, setTaskList] = useState([{ id: '1', title: 'ReadBook' }]);
    return [
        taskList,
        setTaskList,
    ];
}

export default useData;