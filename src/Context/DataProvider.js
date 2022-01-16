import { createContext } from "react";
import useData from "./useData";



export const DataContext = createContext();

const DataProvider = (props) => {
    const allContext = useData();
    return (
        <DataContext.Provider value={allContext}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataProvider;