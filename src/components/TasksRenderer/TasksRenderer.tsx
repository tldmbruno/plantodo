import { Task } from "../TodoList/TodoList";

interface PropsRenderList {
  tasks: Task[];
  toggleDone: (Task: Task) => void;
  moveTask:(Task: Task, toRelativeIndex: number) => void;
	editTask: (Task: Task) => void;
  deleteTask: (Task: Task) => void;
}

// Shows all items in a particular list
export default function TasksRenderer({toggleDone, moveTask, editTask, deleteTask, tasks}: PropsRenderList) {
  return (
    <>
      {tasks.length > 0 ?
        <ul className='list'>
          {tasks.map((task, index) =>
          <li key={task.id} className={task.done ? 'done' : ''}>
            <div className='fullWidth' onClick={() => toggleDone(task)}>
              <input title={`${task.done?'Unmark':'Mark'} ${task.text} as done`} type='checkbox' checked={task.done} onChange={() => null}/>
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
      :
      <div className='container fade-in'>
        <span className='optional'>💡 Now create your first task by clicking the 'Add' button!</span>
        <span className='mobile'>💡 Now create your first task by clicking the ➕ button!</span>
      </div>
      }
    </>
  );
}