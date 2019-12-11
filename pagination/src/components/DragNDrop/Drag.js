import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Drag = () => {
  const items = ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"];
  const [draggableItems, setDraggableItems] = useState(items);
  const [draggedItem, setDraggedItem] = useState(null);

  const onDragStart = (e, index) => {
    setDraggedItem(draggableItems[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = index => {
    let draggedOverItem = draggableItems[index];
    if (draggedItem === draggedOverItem) {
      return;
    }
    let filteredItems = draggableItems
      .slice()
      .filter(item => item !== draggedItem);
    filteredItems.splice(index, 0, draggedItem);
    setDraggableItems(filteredItems);
  };

  const onDragEnd = () => {
    setDraggedItem(null);
  };
  return (
    <div className="App">
      <div className="App">
        <main>
          <h3>List of items</h3>
          <ul>
            {draggableItems.map((item, index) => (
              <li
                key={index}
                onDragOver={() => onDragOver(index)}
                style={{ border: "1px solid white", margin: "2px" }}
                onDragStart={e => onDragStart(e, index)}
                onDragEnd={onDragEnd}
              >
                <div className="drag" draggable>
                  <FaBars />
                </div>
                <span className="content">{item}</span>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Drag;
