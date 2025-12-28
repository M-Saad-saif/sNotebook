import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";
import Addnote from "./Addnote";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Addnote />
      <div className="row home-saved-container   my-3 ">
        <h2>Your saved notes</h2>
        {notes.map((note) => {
          return <Noteitems key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}
