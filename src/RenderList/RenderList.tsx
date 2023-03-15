interface PropsRenderList {
  toggleHighlighted: (item: Item) => void;
	editListItem: (item: Item) => void;
  deleteListItem: (item: Item) => void;
  itemList: Item[];
}

export interface Item {
	id: number;
	text: string;
  highlighted: boolean;
}

// Shows all items in a particular list
export function RenderList({toggleHighlighted, editListItem, deleteListItem, itemList}: PropsRenderList) {
  function onToggle(item: Item) {
    toggleHighlighted(item);
  }

  return (
    <ul className='list'>
      {itemList.map(item =>
      <li key={item.id} onClick={() => onToggle(item)} className={item.highlighted ? 'highlighted' : ''}>
        <div>
          <input type='checkbox' checked={item.highlighted}/>
          <label>{item.text}</label>
        </div>
        <div>
          <button onClick={() => editListItem(item)}>Edit</button>
          <button className='danger' onClick={() => deleteListItem(item)}>Delete</button>
        </div>
      </li>
      )}
    </ul>
  );
}