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
    }, [tasks]);

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
          console.error(error.message);
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
          console.error(error.message);
        });
    };
    

   const updateTask = async (updatedTask) => {
    await axios.put(`${VITE_API_URL}/tasks/${updatedTask.id}`, updatedTask)
    .then(({ data }) => {
      const { success, task,message } = data;
      if(!success) throw new Error(message);
      setTasks((t)=>task.id === t.id ? task : t)
    })
    .catch((error) => {
      console.error(error.message);
    });
   };

  return {tasks, addTask,removeTask,updateTask}
}

export default useTasks;
