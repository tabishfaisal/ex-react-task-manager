import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
import Modal from '../Components/Modal';



const TaskDetail = () => {
    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);
    const navigate =useNavigate();
 

    const task = tasks.find(task =>task.id === parseInt(id));
    if(!task){
        return(
        <h1>Task Wasn't found</h1>
        )
    }
    const handleDelete = async ()=>{
      try{
        await removeTask(task.id)
        alert(`Task with ID: ${id} Deleted Successfully`)
        navigate('/')
      }catch(error){
        console.error(error);
        alert(error.message)
        
      }
    }

    const [show,setShow] = useState(false)

  return (
    <div className='detail-container'>
        <h2>Task Detail</h2>
        <p>Name: {task.title}</p>
        <p>Description: {task.description}</p>
        <p>Creation Date: {new Date(task.createdAt).toLocaleDateString()}</p>
        <button onClick={()=>setShow(true)}>Delete Task</button>
        <Modal 
        title='Detele Confirmation'
        content={'Are you sure you would like to Detele'}
        show = {show}
        onClose={()=>setShow(false)}
        onConfirm={handleDelete}
        />
    </div>
  )
}

export default TaskDetail
