import React, { useState } from "react";

const DragHorizontal = () => {
  const tasks = [
    {
      name: "Learn Angular",
      category: "wip",
      bgcolor: "yellow"
    },
    {
      name: "React",
      category: "wip",
      bgcolor: "pink"
    },
    {
      name: "Vue",
      category: "complete",
      bgcolor: "skyblue"
    }
  ];
  const [items, setItems] = useState(tasks);

  const onDragOver = e => {
    e.preventDefault();
  };
  const onDragStart = (e, name) => {
    console.log(name);
    e.dataTransfer.setData("name", name);
    e.dataTransfer.setData("text/html", e.target.parentNode);
  };
  const onDrop = (e, cat) => {
    let name = e.dataTransfer.getData("name");
    let newItems = items.map(item =>
      item.name === name
        ? (item = {
            ...item,
            category: cat
          })
        : item
    );
    setItems(newItems);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <div
        style={{
          height: "300px",
          width: "300px",
          padding: "15px",
          border: "3px solid black",
          marginRight: "10px"
        }}
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e, "wip")}
      >
        {items
          .filter(item => item.category === "wip")
          .map(subItem => (
            <div
              key={subItem.name}
              onDragStart={e => onDragStart(e, subItem.name)}
              draggable
              className="draggable"
              style={{
                backgroundColor: subItem.bgcolor,
                margin: "10px",
                padding: "10px",
                fontSize: "25px",
                textAlign: "center",
                cursor: "move"
              }}
            >
              {subItem.name}
            </div>
          ))}
      </div>
      <div
        style={{
          height: "300px",
          width: "300px",
          padding: "15px",
          border: "3px solid black"
        }}
        className="droppable"
        onDragOver={e => onDragOver(e)}
        onDrop={e => onDrop(e, "complete")}
      >
        {items
          .filter(item => item.category === "complete")
          .map(subItem => (
            <div
              key={subItem.name}
              onDragStart={e => onDragStart(e, subItem.name)}
              draggable
              className="draggable"
              style={{
                backgroundColor: subItem.bgcolor,
                margin: "10px",
                padding: "10px",
                fontSize: "25px",
                textAlign: "center",
                cursor: "grab"
              }}
            >
              {subItem.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DragHorizontal;
