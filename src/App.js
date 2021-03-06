import DataProvider from './Context/DataProvider';
import DataTable from './Components/DataTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskManager from './Components/TaskManager';


function App() {
  return (
    <BrowserRouter>

      <DataProvider>
        <Routes>

          <Route path="/" element={<DataTable />
          } />

          <Route path="addtask" element={<TaskManager />} />
          <Route path="edittask/:taskid" element={<TaskManager />} >

          </Route>
        </Routes>
      </DataProvider>

    </BrowserRouter>

  );
}

export default App;
