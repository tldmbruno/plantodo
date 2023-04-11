interface PropsRenderList {
  tasks: Task[];
  toggleHighlighted: (Task: Task) => void;
  
  moveTask:(Task: Task, toRelativeIndex: number) => void;

	editTask: (Task: Task) => void;
  deleteTask: (Task: Task) => void;
}

export interface Task {
	id: number;
	text: string;
  highlighted: boolean;
}

// Shows all items in a particular list
export function RenderTasks({toggleHighlighted, moveTask, editTask, deleteTask, tasks}: PropsRenderList) {
  return (
    <ul className='list'>
      {tasks.map((task, index) =>
      <li key={task.id} className={task.highlighted ? 'highlighted' : ''}>
        <div className='fullWidth' onClick={() => toggleHighlighted(task)}>
          <input title={`${task.highlighted?'Unmark':'Mark'} ${task.text} as done`} type='checkbox' checked={task.highlighted} onChange={() => null}/>
          <label>{task.text}</label>
        </div>
        <div className='visibleOnParentHover'>
          <button title='Move upwards' className='optional' onClick={() => moveTask(task, -1)} hidden={index==0}>⬆</button>
          <button title='Move downwards' className='optional' onClick={() => moveTask(task, +1)} hidden={index+1 == tasks.length}>⬇</button>

          <button title={`Rename ${task.text}`} onClick={() => editTask(task)}>📝</button>
          <button title={`Delete ${task.text}`} className='danger' onClick={() => deleteTask(task)}>❌</button>
        </div>
      </li>
      )}
    </ul>
  );
}