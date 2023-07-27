import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { getCategories, getNotes } from "../utils/api";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteNote } from "../utils/api";
import { sweetAlertSuccess, sweetConfirm } from "../utils/sweet-alert";

const DetailNote = ({onDelete}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const componentRef = useRef();

  const [allNotes, setAllNotes] = useState(null);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState("none");

  useEffect(() => {
    async function fetchData() {
      const categoriesResponse = await getCategories();
      const notesResponse = await getNotes();

      setCategories(categoriesResponse.data);
      setAllNotes(notesResponse.data);
    }

    fetchData();
  }, []);

  const handleBackButton = () => {
    navigate(-1)
  }

  const handleDeleteButton = async (id) => {
    if(!(await sweetConfirm())) {
      return;
    }

    await deleteNote(id)
    sweetAlertSuccess('Your note has been deleted', 'Deleted!');
    navigate('/');
  }

  const selectedNote = allNotes ? allNotes.find((note) => note.id === id) : null;

  useEffect(() => {
    if (selectedNote && categories) {
      const foundCategory = categories.find((category) => category.id === selectedNote.category_id);
      if (foundCategory) {
        setCategory(foundCategory.name);
      }
    }
  }, [selectedNote, categories]);


  return (
    <>
      {selectedNote && ( 
        <section className="detail-page" ref={componentRef}>
          <div className="container-detail">
            <div className="header-detail">
              <div>
                <p className="notes-title">{selectedNote.title}</p>
                <p className="notes-category">{category}</p> {/* Display category here */}
              </div>
              <div>
                <Link to={`/edit/${selectedNote.id}`} className="button-detail">Edit</Link>
                <button className="button-detail" onClick={() => handleDeleteButton(selectedNote.id)}>Hapus</button>
                <button className="button-detail" onClick={handleBackButton}>Back</button>
              </div>
            </div>
            <div className="body-section">
              <div className="keyword-section">
                <p className="keyword-title">Keywords</p>
                <pre className="keyword-list">{selectedNote.cue}</pre>
              </div>
              <div className="text-section">
                <p className="summary-title">Text Asli</p>
                <pre className="text-list">{selectedNote.main}</pre>
              </div>
            </div>
            <div className="summary-section">
              <p className="summary-title">Kesimpulan</p>
              <pre className="summary-list">{selectedNote.summary}</pre>
                
              </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DetailNote;