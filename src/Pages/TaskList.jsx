import React, { useContext, useMemo, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import TaskRow from '../Components/TaskRow'
import { useCallback } from 'react';


const debounce = (callback, delay) => {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value)
    }, delay)
  }
}

const TaskList = () => {
  const { tasks } = useContext(GlobalContext);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);
  const [search, setSearch] = useState('');
  const debounceSearch = useCallback(debounce(setSearch, 500), []);


  const sortingSymbol = sortOrder === 1 ? '↑' : '↓';

  const handleSorting = (colonna) => {
    if (sortBy === colonna) {
      setSortOrder((sortOrder) => sortOrder * -1)
    } else {
      setSortBy(colonna);
      setSortOrder(1);
    }
  }

  const filteredSortedTask = useMemo(() => {
    return [...tasks]
      .filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        let comparison;
        if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'createdAt') {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          comparison = dateA - dateB;
        } else if (sortBy === 'status') {
          const options = ['To do', 'Doing', 'Done'];
          const indexA = options.indexOf(a.status);
          const indexB = options.indexOf(b.status);
          comparison = indexA - indexB;
        }
        return comparison * sortOrder;
      })
  }, [tasks, sortBy, sortOrder, search])





  return (
    <div className='container'>

      <h1>My Tasks List</h1>
      <div className="search">
        <label htmlFor="search">🔍</label>
      <input type="text" placeholder='Search Task...' onChange={(e) => debounceSearch(e.target.value)} />
      </div>
      
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSorting('title')}>
              Task Title {sortBy === 'title' && sortingSymbol}
            </th>
            <th onClick={() => handleSorting('createdAt')}>
              Created Date {sortBy === 'createdAt' && sortingSymbol}
            </th>
            <th onClick={() => handleSorting('status')}>
              Status {sortBy === 'status' && sortingSymbol}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredSortedTask.map((task) => (
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





