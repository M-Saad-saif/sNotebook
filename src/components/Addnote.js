import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function Addnote(props) {
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleaddclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Noted Added", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Add your notes</h2>
      <form>
        <div className="mb-3 my-3 ">
          <div className="input-group">
            <input
              type="text"
              className=" input"
              style={{ width: "100%", border:"1.5px solid black" }}
              id="title"
              name="title"
              value={note.title}
              autoComplete="off"
              required
              onChange={onChange}
            />

            <label htmlFor="title" className="form-label user-label">
              Title
            </label>
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group my-4">
            <textarea
              type="text"
              className=" input"
              style={{ width: "100%" , border:"1.5px solid black"}}
              id="description"
              name="description"
              value={note.description}
              autoComplete="off"
              required
              rows={1}
              onChange={onChange}
            />
            <label htmlFor="description" className="form-label user-label">
              Description
            </label>
          </div>
          <div className="input-group my-4">
            <input
              type="text"
              className=" input"
              style={{ width: "100%" , border:"1.5px solid black"}}
              id="tag"
              name="tag"
              value={note.tag}
              autoComplete="off"
              required
              onChange={onChange}
            />
            <label htmlFor="tag" className="form-label user-label">
              Tag
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary add-btn"
          onClick={handleaddclick}
          disabled={note.title.length < 3 || note.description.length < 5}
        >
          Add note
        </button>
      </form>
    </div>
  );
}
