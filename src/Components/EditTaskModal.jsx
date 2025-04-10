import React, { useRef, useState } from 'react';
import Modal from './Modal';

const EditTask = ({ show, onClose, task, onSave }) => {
  const [editTask, setEditTask] = useState(task);
  const editFormRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editTask);
  };

  return (
    <Modal
      title="Modify Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              name="title"
              value={editTask.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={editTask.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Status:
            <select name="status" value={editTask.status} onChange={handleChange}>
              {['To do', 'Doing', 'Done'].map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </form>
      }
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  );
};

export default EditTask;

