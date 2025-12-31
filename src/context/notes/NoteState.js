import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://192.168.18.106:5000";

  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  // gettin all notes
  const getNotes = async () => {
    // API calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // adding a note
  const addnote = async (title, description, tag) => {
    // API calls
    // adding note from backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
      // …
    });
    const note = await response.json();
    // adding note from frontend
    setNotes(notes.concat(note));
    console.log("adding a note", note);
  };

  // deleteign note
  const deleteNote = async (id, title, description, tag) => {
    // API calls
    // deleting note from backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
      // …
    });
    const json = await response.json();
    console.log("note deleted with id of: " + id);
    console.log(json);

    // deleting note from frontend
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // editing note
  const editNote = async (id, title, description, tag) => {
    // API calls
    // edit note from backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
      // …
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    // logic to edit notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, addnote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
