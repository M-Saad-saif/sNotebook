import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function Addnote() {
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "---", 
  });

  const handleaddclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2>Add your notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            name="title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleaddclick}
        >
          Add note
        </button>
      </form>
    </div>
  );
}
