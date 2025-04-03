import React, { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import TaskRow from '../Components/TaskRow'

const TaskList = () => {
  const { tasks } = useContext(GlobalContext)

  return (
    <div className='container'>
      <h1>La Lista dei Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Created Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow 
              key={task.id}
              title={task.title}
              createdAt={task.createdAt} 
              status={task.status} 
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList





