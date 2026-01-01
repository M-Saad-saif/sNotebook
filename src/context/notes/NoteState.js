import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);
  const { setProgress } = props;

  // gettin all notes
  const getNotes = async () => {
    try {
      setProgress(30);
      const response = await fetch(`${API_URL}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // Make sure this is correct
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to fetch notes");
      }

      setNotes(json);
      setProgress(100);
    } catch (error) {
      setProgress(100);
      throw error;
    }
  };
  // adding a note
  const addnote = async (title, description, tag) => {
    // API calls
    // adding note from backend
    setProgress(30);

    const response = await fetch(`${API_URL}/api/notes/addnote`, {
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
    setProgress(100);
  };

  // deleteign note
  const deleteNote = async (id, title, description, tag) => {
    setProgress(30);

    // API calls
    // deleting note from backend
    const response = await fetch(`${API_URL}/api/notes/deletenote/${id}`, {
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
    setProgress(100);
  };

  // editing note
  const editNote = async (id, title, description, tag) => {
    setProgress(30);

    // API calls
    // edit note from backend
    const response = await fetch(`${API_URL}/api/notes/updatenote/${id}`, {
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
    setProgress(100);
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
