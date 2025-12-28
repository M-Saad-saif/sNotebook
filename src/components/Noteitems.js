import React from "react";

export default function Noteitems(props) {
  const { note } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text"><strong>Tag: </strong> {note.tag}</p>
        </div>
      </div>
    </div>
  );
}
