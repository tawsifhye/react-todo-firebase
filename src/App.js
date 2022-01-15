import './App.css';
import DataProvider from './Context/DataProvider';
import DataTable from './Components/DataTable';


function App() {
  return (
    <div >
      <DataProvider>
        <DataTable />
      </DataProvider>
    </div>
  );
}

export default App;
