import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Noteitems(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="brutalist-card mx-3 my-3">
      <div className="brutalist-card__header ">
        <div
          className="brutalist-card__alert text-center"
          style={{ textAlign: "center" }}
        >
          <i className="fa-solid fa-star"></i> {note.title}
        </div>
      </div>
      <div className="brutalist-card__message">
        <textarea
          name=""
          id=""
          rows={5}
          style={{ width: "105%", textAlign: "justify", margin: "0px -6px", border:"none" }}
        >
          {note.description}
        </textarea>
        <p className="my-3">
          <strong>Tag: </strong>
          {note.tag}
        </p>
      </div>
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
  );
}
