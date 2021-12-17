export default function InProgress({
  kanbandata,
  addItem,
  deleteItem,
  updateItem,
  ondragstart,
  ondrop,
}) {
  const code = 1;

  return (
    <>
      <div className="kanban__column">
        <div className="kanban__column-title">In Progress</div>
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
          {kanbandata[code].items.map((item) => {
            return (
              <div
                contentEditable
                className="kanban__item-input"
                id={item.id}
                key={item.id}
                onDoubleClick={(e) => deleteItem(1, e.target.id)}
                onBlur={(e) => updateItem(1, e.target.textContent, e.target.id)}
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
          onClick={() => addItem(1)}
          type="button"
          className="kanban__add-item"
        >
          + Add
        </button>
      </div>
    </>
  );
}
