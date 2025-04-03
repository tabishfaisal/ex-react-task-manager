import { useState, useEffect } from "react";

const { VITE_API_URL } = import.meta.env

const useTasks = () => {
    const [tasks,setTasks] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                
                setTasks(result);
            })
            .catch(error => console.log(error));
    }, []);
    

   const addTask = () =>{};

   const removeTask = () => {};

   const updateTask = () => {};

  return {tasks, addTask,removeTask,updateTask}
}

export default useTasks;
