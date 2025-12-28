import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  // gettin all notes
  const getNotes = async () => {
    // API calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1MDFlNDI0ZWJiODRlNTQ5M2QwY2VkIn0sImlhdCI6MTc2Njg1ODMwNn0.WGmD5X40uDzFf78kzgPi2hgo1RJOxSlRBjsZaQLllfk",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)
  };

  // adding a note
  const addnote = async (title, description, tag) => {
    // API calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1MDFlNDI0ZWJiODRlNTQ5M2QwY2VkIn0sImlhdCI6MTc2Njg1ODMwNn0.WGmD5X40uDzFf78kzgPi2hgo1RJOxSlRBjsZaQLllfk",
      },
      body: JSON.stringify({ title, description, tag }),
      // …
    });
    const json = response.json();
    console.log("adding a note");

    const note = {
      _id: "69503373c506sadf44540b4cea8f",
      user: "69501e424ebb84e5493d0ced",
      title: title,
      description: description,
      tag: tag,
      date: "2025-12-27T19:45:00.411Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // deleteign note
  const deleteNote = async (id, title, description, tag) => {
    // API calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1MDFlNDI0ZWJiODRlNTQ5M2QwY2VkIn0sImlhdCI6MTc2Njg1ODMwNn0.WGmD5X40uDzFf78kzgPi2hgo1RJOxSlRBjsZaQLllfk",
      },
      body: JSON.stringify({ title, description, tag }),
      // …
    });
    const json = response.json();
    console.log("note deleted with id of: " + id);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // editing note
  const editNote = async (id, title, description, tag) => {
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      // API calls
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1MDFlNDI0ZWJiODRlNTQ5M2QwY2VkIn0sImlhdCI6MTc2Njg1ODMwNn0.WGmD5X40uDzFf78kzgPi2hgo1RJOxSlRBjsZaQLllfk",
        },
        body: JSON.stringify({ title, description, tag }),
        // …
      });
      const json = response.json();

      // logic to edit notes
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
