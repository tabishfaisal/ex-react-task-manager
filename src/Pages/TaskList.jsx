import React, { useContext, useMemo, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import TaskRow from '../Components/TaskRow'

const TaskList = () => {
  const { tasks } = useContext(GlobalContext);
  const [sortBy,setSortBy] = useState('createdAt');
  const [sortOrder,setSortOrder] = useState(1);

  const sortingSymbol = sortOrder === 1 ? '↑' : '↓';

  const handleSorting = (colonna) =>{
  if(sortBy === colonna){
    setSortOrder((sortOrder)=>sortOrder *-1)
  } else{
    setSortBy(colonna);
    setSortOrder(1);
  }
 }

 const sortedTask = useMemo(()=>{
  return tasks.sort((a,b)=>{
    let comparison;
    if(sortBy === 'title'){
      comparison = a.title.localeCompare(b.title);
    } else if(sortBy === 'createdAt'){
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      comparison = dateA-dateB;
    } else if(sortBy === 'status'){
      const options = ['to do','doing','done'];
      const indexA = options.indexOf(a.status);
      const indexB = options.indexOf(b.status);
      comparison =  indexA - indexB;
    }
    return comparison * sortOrder;
  })
 },[tasks,sortBy,sortOrder])

  return (
    <div className='container'>
      <h1>La Lista dei Tasks</h1>
      <table>
        <thead>
          <tr>
            <th onClick={()=>handleSorting('title')}>
              Nome {sortBy === 'title' && sortingSymbol}
              </th>
            <th onClick={()=>handleSorting('createdAt')}>
              Created Date {sortBy === 'createdAt' && sortingSymbol}
              </th>
            <th onClick={()=>handleSorting('status')}>
              Status {sortBy === 'status' && sortingSymbol}
              </th>
          </tr>
        </thead>
        <tbody>
          {sortedTask.map((task) => (
            <TaskRow 
              key={task.id}
              id={task.id}
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





