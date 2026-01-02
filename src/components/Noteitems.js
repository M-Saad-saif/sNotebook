import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Noteitems(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const handledeletebtn = () => {
    deleteNote(note._id);
    props.showAlert("Note Deleted", "success");
  };

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
        <p
          name=""
          id=""
          rows={5}
          style={{
            width: "105%",
            textAlign: "justify",
            margin: "0px -6px",
            border: "none",
          }}
        >
          {note.description}
        </p>
        <p className="my-3">
          <strong>Tag: </strong>
          {note.tag ? (
            note.tag
          ) : (
            <i>
              <small>No tag..</small>
            </i>
          )}
        </p>
      </div>

      <i
        title="Delete note"
        className="fa-solid fa-trash-can trash-icon"
        onClick={handledeletebtn}
      ></i>
      <i
        title="Update note"
        className="fa-solid fa-pen-to-square mx-1 edit-icon"
        onClick={() => {
          updateNote(note);
        }}
      ></i>
    </div>
  );
}
