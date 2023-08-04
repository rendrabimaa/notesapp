import React from "react";
import NavigationLogin from "../components/NavigationLogin";
import ReactSelect from "react-select";
import NoteItem from "../components/NoteItem";
import { Link } from "react-router-dom";
import Select from 'react-select'
import { getCategories, editCategories, getNotes, deleteNote, deleteCategories } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import { sweetAlertSuccess, sweetConfirm } from "../utils/sweet-alert";
import EditCategory from "../components/EditCategory";
import { saveDataToDB, getDataFromIndexedDB } from "../utils/db";
import { IoIosAddCircle, IoMdClose, IoMdCloseCircle, IoMdRemoveCircle } from "react-icons/io";

function NotesPage({ user, setUser, categoryActive }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultKeyword = searchParams.get("keyword");

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  const [notes, setNotes] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [category, setCategory] = React.useState(categoryActive);
  const [keyword, setKeyword] = React.useState(defaultKeyword || "");

  const options = [
    { value: 'all', label: 'All' }
  ]

  const isOnline = () => navigator.onLine;

  React.useEffect(() => {
    
    // const fetchData = () => {
    //   // const indexedDBNotesData = await getDataFromIndexedDB('notes')
    //   // const indexedDBCategoriesData = await getDataFromIndexedDB('categories')

    //   if(isOnline()) {
    //     try {
    //       fetchDataAndSaveToDB();
    //     } catch (err) {
    //       setNotes(getDataFromIndexedDB("notes"))
    //       setCategories(getDataFromIndexedDB("categories"))
    //     }
    //   }
    // }

    // fetchData();

    fetchDataAndSaveToDB()
  }, []);

  async function fetchNotes() {
    const { data } = await getNotes();

    setNotes(data);

    return data;
  }

  async function fetchCategories() {
    const { data } = await getCategories();

    setCategories(data);

    return data;
  }

  async function fetchDataAndSaveToDB() {
    try {
      const notesFromAPI = await fetchNotes();
      const categoriesFromAPI = await fetchCategories();
      saveDataToDB(notesFromAPI, "notes");
      saveDataToDB(categoriesFromAPI, "categories");

      console.log('Data berhasil disimpan ke database');
    } catch (error) {
      console.error('Gagal menyimpan data ke database:', error);
    }
  }  

  async function onDeleteHandler(id) {
    if (!(await sweetConfirm())) {
      return;
    }

    await deleteNote(id);
    
    const { data } = await getNotes();

    setNotes(data);
    sweetAlertSuccess('Your note has been deleted', 'Deleted!');
  }

  function onKeywordChangeHandler(event) {
    setKeyword(event.target.value);
    changeSearchParams(event.target.value);
  }

  function onSelectChangeHandler(event) {
    setCategory(event.value);
  }

  let printElementNotes = <p>Loading...</p>;

  if (notes !== null) {
    if (notes.length === 0) {
      printElementNotes = <p className="empty-notes">Add or Choose a Category to add a new Note!</p>; 
    } else {
      let newNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(keyword.toLowerCase());
      });
      if (category !== "all") {
        newNotes = newNotes.filter((note) => {
          return note.category_id === category;
        });
      }

      if (newNotes.length === 0) {
        printElementNotes = <p>Empty</p>; 
      } else {
        printElementNotes = (
          <>
            {newNotes.map((note) => (
              <NoteItem key={note.id} id={note.id} title={note.title} keywords={note.cue} summary={note.summary} time={note.created_at} onDelete={onDeleteHandler} />
            ))}
          </>
        )
      }
    }
  }

  let printElementSelect = (
    <ReactSelect
      value={options}
      options={options}
      onChange={options}
      placeholder="cari category disini..."
      isSearchable // Tambahkan properti isSearchable di sini
      className="category-select"
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
        isSearchable={true}
        className="category-select"
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

  async function onDeleteCategoryHandle(id) {
    if (!(await sweetConfirm())) {
      return;
    }
    await deleteCategories(id);

    fetchCategories();
    
    sweetAlertSuccess('Your Category has been deleted', 'Deleted!');
    
  }

  async function onEditCategoryHandle(name, id) {
    await editCategories({name}, id)

    fetchCategories();
  }

  return (
    <>
      <NavigationLogin user={user} setUser={setUser} />
      
      <div className="notes-page-container">
        <div className="contain-title">
          <p className="title-note">Notes</p>
          <div className="header-edit">
            <div className="add-container">
              <Link to="/notes/add"><i className="fa-solid fa-plus"></i> Add new note</Link>
            </div>
            <div className="button-edit-category">
              <EditCategory categories={categories} onDeleteCategory={onDeleteCategoryHandle} onEditCategory={onEditCategoryHandle}/>
            </div>
          </div>
        </div>
        <div className="note-header">
          <div className="search-container">
            <label>Search Note</label>
            <input type="text" placeholder="Search.." className="search" value={keyword} onChange={onKeywordChangeHandler} />
          </div>
          <div className="select-add-container">
            <div className="select-container">
              <p className="cat-text">Category</p>
              {printElementSelect}
            </div>
          </div>
        </div>
        <div className="notes-container">
          {printElementNotes}
          {/* <NoteItem title={'title'} time={'18 November 2022'} summary={'Ini adalah summary Ini adalah summary Ini adalah summary'}  />
          <NoteItem title={'title'} time={'18 November 2022'} summary={'Ini adalah summary'}  />
          <NoteItem title={'title'} time={'18 November 2022'} summary={'Ini adalah summary'}  /> */}
        </div>
      </div>
    </>
  )
}

export default NotesPage;