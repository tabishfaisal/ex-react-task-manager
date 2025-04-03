import { useState, useRef, useMemo } from "react";
import useTasks from "../Hooks/useTasks";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

const AddTask = () => {
  const { addTask } = useTasks();
  const [taskName, setTaskName] = useState('');
  const descriptionRef = useRef();
  const statusRef = useRef();


  const isNameInvalid = useMemo(() => {
    if (!taskName.trim()) {
      return 'Name must be filled'
    }
    if ([...taskName].some(char => symbols.includes(char))) {
      return 'Name cannot contain symbols'
    }
    return '';
  }, [taskName])


  const handleForm = async (e) => {
    e.preventDefault();
    const newTask = {
      title: taskName,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    }

    try {
      await addTask(newTask);
      alert('Task added');
      setTaskName('');
      descriptionRef.current.value = '',
        statusRef.current.value = '';
    } catch (error) {
      alert(error.message)
    }

    //console.log(newTask);

  }


  return (
    <div className="container">
      <form onSubmit={handleForm}>
        <label htmlFor="name">Task Name</label>
        <input
          type="text"
          placeholder="Insert Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        {isNameInvalid && <p style={{ color: 'red', fontSize: 'small', marginTop: '0' }}>{isNameInvalid}</p>}

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Insert Task Description"
          ref={descriptionRef}
        ></textarea>

        <label htmlFor="status">Status</label>
        <select ref={statusRef}>
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;


