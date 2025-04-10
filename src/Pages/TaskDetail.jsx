import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../Hooks/useTasks";
import Modal from "../Components/Modal";
import { useState } from "react";
import EditTaskModal from "../Components/EditTaskModal";
const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useTasks();

  const [showModal, setShowModal] = useState(false);
  const [editShow, setEditShow] = useState(false);


  const taskWithID = tasks.find((task) => task.id === parseInt(id));

  const handleDelete = async () => {
    try {
      await removeTask(taskWithID.id);
      alert("Task deleted");
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert('Task edited')
      setEditShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!taskWithID) {
    return <h1>Task wasn't found</h1>;
  }

  return (
    <div className="task-container">
      <h2>{taskWithID.title}</h2>
      <p>{taskWithID.description}</p>
      <p>{taskWithID.status}</p>
      
      <button className="btn" onClick={() => setShowModal(true)}>Delete</button>
      <button onClick={() => setEditShow(true)}>Modify</button>

      <Modal
        title="Confirming Deletion"
        content="Are you sure you want to delete?"
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />

      <EditTaskModal 
        task={taskWithID} 
        show={editShow}
        onClose={() => setEditShow(false)}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default TaskDetail;
