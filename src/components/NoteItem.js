import React from "react";

function NoteItem({ title, time, summary }) {
  return (
    <div className="note-container">
      <div className="note-item-left">
        <h2>{title}</h2>
        <p className="time">{time}</p>
        <p>{summary}</p>
      </div>
      <div className="note-item-right">
        <i class="fa-regular fa-pen-to-square"></i>
        <i class="fa-solid fa-circle-xmark"></i>
      </div>
    </div>
  )
}

export default NoteItem;