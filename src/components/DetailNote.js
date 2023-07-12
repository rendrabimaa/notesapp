import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { editNotes, postNotes } from "../utils/api";
import useInput from "../hooks/useInput";
import Select from 'react-select'
import { getCategories, getNotes } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { sweetAlertError, sweetAlertSuccess } from "../utils/sweet-alert";

const DetailNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const [title, handleTitleChange, setTitle] = useInput("");
  const [main, handleMainChange, setMain] = useInput("");
  const [cue, handleCueChange, setCue] = useInput("");
  const [summary, handleSummaryChange, setSummary] = useInput("");
  const [notes, setNotes] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [category, setCategory] = React.useState("none");

  React.useEffect(() => {
    async function fetchCategories() {
      const { data } = await getCategories();

      setCategories(data);
    }

    async function fetchNotes() {
      const { data } = await getNotes();

      const newData = data.filter((note) => {
        return note.id === id;
      });

      if (newData.length === 1) {
        setTitle(newData[0].title);
        setMain(newData[0].main);
        setCue(newData[0].cue);
        setSummary(newData[0].summary);
        setCategory(newData[0].category_id);
      } else {
        document.querySelector('.addnote-page').innerHTML = '<p>Tidak ketemu</p>'
      }

      setNotes(data);
    }

    fetchCategories();
    fetchNotes();
  }, []);

  const options = [
    { value: 'none', label: 'None' }
  ]

  let printElementSelect = (
    <Select 
      options={options} 
      isDisabled={true}
      isLoading={true}
      className="react-select-container" 
    />
  );

  if (categories !== null) {
    for (let i = 0; i < categories.length; i++) {
      options.push({value: categories[i].id, label: categories[i].name})
    }

    printElementSelect = (
      <Select 
        options={options} 
        value={options.filter(option => option.value === category)[0]} 
        onChange={onSelectChangeHandler}
        isSearchable={false}
        className="react-select-container" 
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'gray',
            primary50: '#fff',
            primary: 'black',
          },
        })}
      />
    )
  }

  function onSelectChangeHandler(event) {
    setCategory(event.value);
  }

  async function onSaveNoteHandler() {
    const { error, message } = await editNotes({
      title,
      cue,
      main,
      summary,
      categoryId: category,
    }, id);

    if (!error) {
      navigate('/');
      return sweetAlertSuccess("Your note is modified", "Success!");
    }

    sweetAlertError(message);
  }; 

  return (
    <>
      <section className="addnote-page" ref={componentRef}>
        <div className="container-addnote">
          <div className="add-title">
            <div className="title-addnote" >
              <label htmlFor="titlenote" className="input-label">Title</label>
              <input type="text" name="titlenote" id="titlenote" className="input-field" placeholder="Title" value={title} onChange={handleTitleChange} />
            </div>
            <div className="select-add">
              <p>CATEGORY</p>
              {printElementSelect}
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
              <button className="note-button martop" onClick={onSaveNoteHandler}> Save Note </button>   
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


export default DetailNote;