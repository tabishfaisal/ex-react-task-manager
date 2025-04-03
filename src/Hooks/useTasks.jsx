import { useState, useEffect } from "react";
import axios from 'axios';

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

    const addTask = (newTask) => {
        axios.post(`${VITE_API_URL}/tasks`, newTask)
          .then((response) => {
            if (!response.data.success) {
              throw new Error(response.data.message);
            }
            setTasks((prevTasks) => [...prevTasks, response.data.task]);
          })
          .catch((error) => {
            console.error("Errore:", error.message);
          });
      };
      

   const removeTask = () => {};

   const updateTask = () => {};

  return {tasks, addTask,removeTask,updateTask}
}

export default useTasks;
