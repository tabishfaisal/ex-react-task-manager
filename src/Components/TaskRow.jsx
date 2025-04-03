import { memo } from 'react';

const TaskRow = memo(({ title, createdAt, status }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td style={{ color: status === 'Doing' ? 'orange' : status === 'Done' ? 'green' : 'red' }}>
        {status}
      </td>
    </tr>
  );
});

export default TaskRow;



