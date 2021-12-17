import { useState, useEffect } from "react";
import "./App.css";

//Components
import Completed from "./components/Completed";
import NotStarted from "./components/NotStarted";
import InProgress from "./components/InProgress";

const kanbanTemplate = [
  {
    id: 1,
    items: [{ id: "1", content: "" }],
  },
  {
    id: 2,
    items: [{ id: "2", content: "" }],
  },
  {
    id: 3,
    items: [{ id: "3", content: "" }],
  },
];

function App() {
  const [kanbandata, setKanbandata] = useState([...kanbanTemplate]);

  // Add items to the kanban data
  const addItem = (code) => {
    const tempKanbandata = [...kanbandata];
    tempKanbandata[code].items.push({
      id: Math.floor(Math.random() * 100000).toString(),
      content: "",
    });
    setKanbandata(tempKanbandata);
  };

  //Delete items form kanban data
  const deleteItem = (code, id) => {
    const tempKanbandata = [...kanbandata];
    const tempData = tempKanbandata[code].items.filter(
      (item) => item.id !== id
    );
    tempKanbandata[code].items = [...tempData];
    setKanbandata(tempKanbandata);
  };

  // Update contents in kanban data
  const updateItem = (code, updatedValue, id) => {
    const tempKanbandata = [...kanbandata];
    tempKanbandata[code].items.map((item) => {
      if (item.id === id) {
        return (item.content = updatedValue);
      }
      return item;
    });

    setKanbandata(tempKanbandata);
  };

  //when drag event is triggered dataTransfer is started with passing of source code and ID of the dragged div element
  const ondragstart = (e, id, code) => {
    const transferdata = { sourcecode: code, data: id };
    e.dataTransfer.setData("text/plain", JSON.stringify(transferdata));
  };

  //When drop event is triggered, ID passed in data transfer is deleted from old category and added in new category
  const ondrop = (e, code) => {
    const transferdata = JSON.parse(e.dataTransfer.getData("text/plain"));
    const tempKanbandata = [...kanbandata];

    const transferredObject = tempKanbandata[
      transferdata.sourcecode
    ].items.filter((item) => item.id === transferdata.data)[0];
    console.log(transferredObject);
    const tempData = tempKanbandata[transferdata.sourcecode].items.filter(
      (item) => item.id !== transferdata.data
    );
    tempKanbandata[transferdata.sourcecode].items = [...tempData];
    setKanbandata(tempKanbandata);

    tempKanbandata[code].items.push({
      id: transferredObject.id,
      content: transferredObject.content,
    });
    console.log(tempKanbandata);
    setKanbandata(tempKanbandata);
  };

  useEffect(() => {
    let kanbanstore = JSON.parse(localStorage.getItem("kanban-data"));
    if (kanbanstore) {
      setKanbandata(kanbanstore);
    } else {
      localStorage.setItem("kanban-data", JSON.stringify(kanbanTemplate));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(kanbandata));
  }, [kanbandata]);
  return (
    <div className="kanban">
      <NotStarted
        kanbandata={kanbandata}
        addItem={addItem}
        deleteItem={deleteItem}
        updateItem={updateItem}
        ondragstart={ondragstart}
        ondrop={ondrop}
      />
      <InProgress
        kanbandata={kanbandata}
        addItem={addItem}
        deleteItem={deleteItem}
        updateItem={updateItem}
        ondragstart={ondragstart}
        ondrop={ondrop}
      />
      <Completed
        kanbandata={kanbandata}
        addItem={addItem}
        deleteItem={deleteItem}
        updateItem={updateItem}
        ondragstart={ondragstart}
        ondrop={ondrop}
      />
    </div>
  );
}

export default App;
