interface PropsRenderList {
  itemList: Item[];
  toggleHighlighted: (item: Item) => void;
  
  moveListItem:(item: Item, toRelativeIndex: number) => void;

	editListItem: (item: Item) => void;
  deleteListItem: (item: Item) => void;
}

export interface Item {
	id: number;
	text: string;
  highlighted: boolean;
}

// Shows all items in a particular list
export function RenderList({toggleHighlighted, moveListItem, editListItem, deleteListItem, itemList}: PropsRenderList) {
  return (
    <ul className='list'>
      {itemList.map(item =>
      <li key={item.id} className={item.highlighted ? 'highlighted' : ''}>
        <div onClick={() => toggleHighlighted(item)}>
          <input type='checkbox' checked={item.highlighted} onChange={() => null}/>
          <label>{item.text}</label>
        </div>
        <div className='clickable'>
          <button onClick={() => moveListItem(item, -1)}>Up</button>
          <button onClick={() => moveListItem(item, +1)}>Down</button>

          <button onClick={() => editListItem(item)}>Edit</button>
          <button className='danger' onClick={() => deleteListItem(item)}>Delete</button>
        </div>
      </li>
      )}
    </ul>
  );
}