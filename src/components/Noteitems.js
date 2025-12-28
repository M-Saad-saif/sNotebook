import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Noteitems(props) {
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;
  const { note } = props;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">
            <strong>Tag: </strong> {note.tag}
          </p>
          <i
            className="fa-solid fa-trash-can"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              editNote(note._id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
