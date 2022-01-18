import { useState } from "react";

const useData = () => {
    const [taskList, setTaskList] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const deleteTask = id => {
        const newTaskList = taskList.filter((task) => task.id !== id)
        setTaskList(newTaskList);
    }
    const markDone = (id, type) => {

        const completeTask = taskList.find((task) => task.id === id);
        if (type === 'done') {
            completeTask.status = true;
            setIsUpdated(true);
        }
        else {
            completeTask.status = false;
            setIsUpdated(false);
        }

    }
    return [
        taskList,
        setTaskList,
        setIsUpdated,
        deleteTask,
        markDone
    ];
}

export default useData;