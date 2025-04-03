import { createContext } from "react";
import useTasks from "../Hooks/useTasks";

 export const GlobalContext = createContext(); 

const GlobalProvider = ({children})=>{
    const {tasks,addTask,removeTask,updateTask} = useTasks();
    

    return (
        <GlobalContext.Provider value={{tasks,addTask,removeTask,updateTask}}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider;