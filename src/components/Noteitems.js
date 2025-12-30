import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Noteitems(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title" style={{ textAlign: "center" }}>
            {note.title}
          </h5>
          <hr className="my-0" />
          <p className="card-text" style={{ textAlign: "justify" }}>
            {note.description}
          </p>

          <p className="card-text">
            <strong>Tag: </strong> {note.tag}
          </p>
          <hr className="my-0" />
          <i
            className="fa-solid fa-trash-can"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
