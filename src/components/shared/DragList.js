import { List } from "devextreme-react";
import { ItemDragging } from "devextreme-react/list";

export const DragList = (props) => {
  const {
    listData,

    onRemove,
    onReorder,
    onAdd,
    onDragStart,
    group,
    itemName,
    allowReordering,
  } = props;

  return (
    <List dataSource={listData} keyExpr="id">
      <ItemDragging
        allowReordering={allowReordering}
        group={group}
        data={itemName}
        onDragStart={(e) => onDragStart?.(e)}
        onAdd={(e) => onAdd?.(e)}
        onRemove={(e) => onRemove?.(e)}
        onReorder={(e) => onReorder?.(e)}
      ></ItemDragging>
    </List>
  );
};
