import { useRef, useState, useEffect } from "react";
import { editNotes, postNotes } from "../utils/api";
import useInput from "../hooks/useInput";
import CreateableSelect from "react-select/creatable";
import { getCategories, getNotes, postCategories } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { sweetAlertError, sweetAlertSuccess } from "../utils/sweet-alert";


const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const componentRef = useRef();
  const [title, handleTitleChange, setTitle] = useInput("");
  const [main, handleMainChange, setMain] = useInput("");
  const [cue, handleCueChange, setCue] = useInput("");
  const [summary, handleSummaryChange, setSummary] = useInput("");
  const [notes, setNotes] = useState(null);

  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const categoriesResponse = await getCategories();
      const notesResponse = await getNotes();
      setCategories(categoriesResponse.data);
      setNotes(notesResponse.data);

      const selectedNote = notesResponse.data ? notesResponse.data.find((note) => note.id === id) : null;

      if (notesResponse.data && notesResponse.data.length > 0 && categoriesResponse.data && categoriesResponse.data.length > 0) {
        const foundCategory = categoriesResponse.data.find((category) => category.id === selectedNote.category_id);
        if (foundCategory) {
          // Jika kategori ditemukan, atur nilai `category` sesuai dengan objek kategori yang ditemukan
          setCategory({ label: foundCategory.name, value: foundCategory.id });
        }
      }

      setTitle(selectedNote.title)
      setMain(selectedNote.main)
      setCue(selectedNote.cue)
      setSummary(selectedNote.summary)
    }

    fetchData();
    
  }, []);
  
  const selectedNote = notes ? notes.find((note) => note.id === id) : null;

  async function addCategory(name) {
    const { error, message } = await postCategories({
      name,
    });
  
    if (!error) {
      const { data } = await getCategories();
      setCategories(data);
      return sweetAlertSuccess("Kategori berhasil ditambahkan", "Yeayyy!");
    }
    sweetAlertError(message);
  }

  function onSelectChangeCategory(event) {
    setCategory(event);
  }

  const options = [
    { value: 'none', label: 'None' }
  ]

  if (categories !== null) {
    for (let i = 0; i < categories.length; i++) {
      options.push({value: categories[i].id, label: categories[i].name})
    }
  }

  async function onSaveNoteHandler() {
    const { error, message } = await editNotes({
      title,
      cue,
      main,
      summary,
      categoryId: category.value,
    }, id);

    if (!error) {
      navigate('/');
      return sweetAlertSuccess("Your note is modified", "Success!");
    }

    sweetAlertError(message);
  }; 

  return (
    <>
    {
      selectedNote && (
        <section className="addnote-page" ref={componentRef}>
        <div className="container-addnote">
          <div className="add-title">
            <div className="title-addnote" >
              <label htmlFor="titlenote" className="input-label">Title</label>
              <input type="text" name="titlenote" id="titlenote" className="input-field" placeholder="Title" value={title} onChange={handleTitleChange} />
            </div>
            <div className="select-add">
              <p>Category</p>
              {categories !== null && (
                <CreateableSelect
                  options={categories.map((category) => ({ label: category.name, value: category.id }))}
                  onCreateOption={(label) => addCategory(label)}
                  onChange={onSelectChangeCategory}
                  isClearable={true}
                  value={category}
                  className="kategori-add-note"
                />
              )}  
            </div>
          </div>
          <div className="note-columns" id="note-columns">
            <label htmlFor="columns-note" className="input-label-note">Notes </label>
            <textarea id="note-columns-note" name="columns-note" className="input-notee" rows="15" cols="50" value={main} onChange={handleMainChange} />
          </div>
          <div className="note-columns">
            <label htmlFor="cue-columns-note" className="input-label-note martop">Keywords</label>
            <textarea id="cue-columns-note" name="cue-columns-note" className="input-notee" rows="8" cols="50" value={cue} onChange={handleCueChange} />
          </div>
          <div className="note-columns">
              <label htmlFor="summarynote" className="input-label-note martop">Summary</label>
              <textarea id="note-summary" type="text" name="summarynote" className="input-notee" placeholder="Summary" rows="8" value={summary} onChange={handleSummaryChange} />
          </div>
          <div className="button-sec">
            <div>
              <button className="note-button martop" onClick={onSaveNoteHandler}> Edit Note </button>   
            </div>
          </div>
        </div>
      </section>
      )
    }
    </>
  )
}


export default EditNote;