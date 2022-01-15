import React from 'react';
import useDataProvider from '../Context/useDataProvider'

const DataTable = () => {
    const [taskList, setTaskList] = useDataProvider();
    // const updatedTask = [...taskList, { id: '2', title: 'seleep' }];
    // setTaskList(updatedTask);
    console.log(taskList);
    return (
        <div>

        </div>
    );
};

export default DataTable;