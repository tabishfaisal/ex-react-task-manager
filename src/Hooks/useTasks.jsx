import { useState, useEffect } from "react";
import axios from 'axios';

const { VITE_API_URL } = import.meta.env

const useTasks = () => {
    const [tasks,setTasks] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(result => {
                setTasks(result);
            })
            .catch(error => console.log(error));
    }, []);

    const addTask = (newTask) => {
      axios
        .post(`${VITE_API_URL}/tasks`, newTask)
        .then(({ data }) => {        
          const { success, message, task } = data;       
          if (!success) {
            throw new Error(message);
          }
          setTasks((prevTasks) => [...prevTasks, task]); 
        })
        .catch((error) => {
          console.error("Errore:", error.message);
        });
    };

    const removeTask = (taskId) => {
      axios.delete(`${VITE_API_URL}/tasks/${taskId}`)
        .then(({ data }) => {
          const { success } = data;  
          if (success) {
            setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
          }
        })
        .catch((error) => {
          console.error("Error deleting task:", error.message);
        });
    };
    

   const updateTask = () => {};

  return {tasks, addTask,removeTask,updateTask}
}

export default useTasks;
