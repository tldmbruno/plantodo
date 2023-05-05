import { Task } from "../TodoList/TodoList";

import style from './TasksRenderer.module.css';
import RenamerInput from "../RenamerInput/RenamerInput";

interface PropsRenderList {
  tasks: Task[];
  toggleDone: (Task: Task) => void;
  moveTask:(Task: Task, toRelativeIndex: number) => void;
	renameTask: (taskId: number, newText: string) => void;
  taskIndexForRenaming: number;
  setTaskIndexForRenaming: (taskId: number) => void;
  deleteTask: (Task: Task) => void;
}

// Shows all items in a particular list
export default function TasksRenderer({toggleDone, moveTask, renameTask, deleteTask, tasks, taskIndexForRenaming, setTaskIndexForRenaming}: PropsRenderList) {    
  return (
    <>
      {tasks.length > 0 ?
        <ul className={style.list}>
          {tasks.map((task, index) =>
          <li key={task.id} className={task.done ? style.done : ''}>
            <div className='fullWidth' onClick={() => toggleDone(task)}>
              <input title={`${task.done?'Unmark':'Mark'} ${task.text} as done`} type='checkbox' checked={task.done} onChange={() => null}/>
              {tasks.findIndex((i) => i.id === task.id) == taskIndexForRenaming ?
                <div className={style.renameTask}>
                  <RenamerInput currentTitle={task.text} listId={task.id} setTitle={renameTask} />
                </div>
                : <label>{task.text}</label>
              }
            </div>
            <div className='visibleOnParentHover'>
              <button title='Move upwards' className='optional compact borderless' onClick={() => moveTask(task, -1)} hidden={index==0}>⬆</button>
              <button title='Move downwards' className='optional compact borderless' onClick={() => moveTask(task, +1)} hidden={index+1 == tasks.length}>⬇</button>

              <button hidden={tasks.findIndex((i) => i.id === task.id) == taskIndexForRenaming} title={`Rename ${task.text}`} className='compact borderless' onClick={() => setTaskIndexForRenaming(tasks.findIndex((i) => i.id === task.id))}>📝</button>
              <button title={`Delete ${task.text}`} className='danger compact borderless' onClick={() => deleteTask(task)}>❌</button>
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