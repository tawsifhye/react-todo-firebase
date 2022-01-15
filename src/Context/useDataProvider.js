import { useContext } from "react";
import { DataContext } from "./DataProvider";

const useDataProvider = () => {
    return useContext(DataContext);
};

export default useDataProvider;