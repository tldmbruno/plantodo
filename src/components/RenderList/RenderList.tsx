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
      {itemList.map((item, index) =>
      <li key={item.id} className={item.highlighted ? 'highlighted' : ''}>
        <div className='fullWidth' onClick={() => toggleHighlighted(item)}>
          <input title={`${item.highlighted?'Unmark':'Mark'} ${item.text} as done`} type='checkbox' checked={item.highlighted} onChange={() => null}/>
          <label>{item.text}</label>
        </div>
        <div className='visibleOnParentHover'>
          <button title='Move upwards' className='optional' onClick={() => moveListItem(item, -1)} hidden={index==0}>⬆</button>
          <button title='Move downwards' className='optional' onClick={() => moveListItem(item, +1)} hidden={index+1 == itemList.length}>⬇</button>

          <button title={`Rename ${item.text}`} onClick={() => editListItem(item)}>📝</button>
          <button title={`Delete ${item.text}`} className='danger' onClick={() => deleteListItem(item)}>❌</button>
        </div>
      </li>
      )}
    </ul>
  );
}