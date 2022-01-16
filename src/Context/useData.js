import { useState } from "react";

const useData = () => {
    const [taskList, setTaskList] = useState([{ id: '1', pendingTask: 'ReadBook' }, { id: '1', pendingTask: 'ReadBook' }]);
    return [
        taskList,
        setTaskList,
    ];
}

export default useData;