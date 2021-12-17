export default function Completed({
  kanbandata,
  addItem,
  deleteItem,
  updateItem,
  ondragstart,
  ondrop,
}) {
  const code = 2;

  return (
    <>
      <div className="kanban__column">
        <div className="kanban__column-title">Completed</div>
        <div className="kanban__add-items">
          <div
            className="kanban__dropzone"
            onDragOver={(e) => {
              e.preventDefault();
              e.target.classList.add("kanban__dropzone--active");
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.target.classList.remove("kanban__dropzone--active");
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.target.classList.remove("kanban__dropzone--active");
              ondrop(e, code);
            }}
          ></div>
          {kanbandata[2].items.map((item) => {
            return (
              <div
                contentEditable
                className="kanban__item-input"
                id={item.id}
                key={item.id}
                onDoubleClick={(e) => deleteItem(2, e.target.id)}
                onBlur={(e) => updateItem(2, e.target.textContent, e.target.id)}
                draggable="true"
                onDragStart={(e) => {
                  ondragstart(e, e.target.id, code);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {item.content}
              </div>
            );
          })}
          <div
            className="kanban__dropzone"
            onDragOver={(e) => {
              e.preventDefault();
              e.target.classList.add("kanban__dropzone--active");
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.target.classList.remove("kanban__dropzone--active");
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.target.classList.remove("kanban__dropzone--active");
              ondrop(e, code);
            }}
          ></div>
        </div>
        <button
          onClick={() => addItem(2)}
          type="button"
          className="kanban__add-item"
        >
          + Add
        </button>
      </div>
    </>
  );
}
