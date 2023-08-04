import React from "react";
import { Link } from "react-router-dom";

const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en", options);
};

function NoteItem({ id, title, time, keywords, summary, onDelete }) {
  return (
    
    <div className="note-container"  ><Link to={`/note/${id}`} id="note-item-link">
      {/* <div className="note-item-left"> */}
      <div className="note-item-top">
        <p className="title-item">{title}</p>
        <i className="fa-solid fa-circle-xmark" onClick={() => onDelete(id)}></i>
      </div>
      <div className="note-date">
        <p className="time">{showFormattedDate(time)}</p>
      </div>
      <div className="keywords">
        <p>{keywords}</p>
      </div>
      {/* </div> */}
      
        {/* <Link to={`/note/${id}`}><i className="fa-regular fa-pen-to-square"></i></Link> */}
        </Link>
    </div>
    
  )
}

export default NoteItem;