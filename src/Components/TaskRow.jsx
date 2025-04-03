import { memo } from 'react';
import { Link } from 'react-router-dom';

const TaskRow = memo(({ id, title, createdAt, status }) => {

  return (
    <tr>
      <td>
        <Link className='linktoDetail' to={`/task/${id}`}>{title}</Link>
      </td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td style={{ background: status === 'Doing' ? 'yellow' : status === 'Done' ? 'green' : 'red' }}>
        {status}
      </td>
    </tr>
  );
});

export default TaskRow;



