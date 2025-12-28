import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row home-saved-container   my-3 ">
      <h2>Your saved notes</h2>
      {notes.map((note) => {
        return <Noteitems note={note} />;
      })}
    </div>
  );
}
