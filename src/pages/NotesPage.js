import React from "react";
import NavigationLogin from "../components/NavigationLogin";
import NoteItem from "../components/NoteItem";
import { Link } from "react-router-dom";
import Select from 'react-select'

function NotesPage({ user, setUser }) {

  const options = [
    { value: 'all', label: 'All' },
    { value: 'matematika', label: 'Matematika' },
    { value: 'PPKn', label: 'PPKn' }
  ]

  return (
    <>
      <NavigationLogin user={user} setUser={setUser} />
      <div className="notes-page-container">
        <div className="search-container">
          <input type="text" placeholder="Search.." className="search" />
        </div>
        <div className="select-add-container">
          <div className="select-container">
            <p>Category</p>
            <Select 
              options={options} 
              defaultValue={options[0]} 
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
          </div>
          <div className="add-container">
            <Link to="/notes/add"><i class="fa-solid fa-plus"></i> Add new note</Link>
          </div>
        </div>
        <div className="notes-container">
          <NoteItem title={'title'} time={'18 November 2022'} summary={'Ini adalah summary Ini adalah summary Ini adalah summary'}  />
          <NoteItem title={'title'} time={'18 November 2022'} summary={'Ini adalah summary'}  />
          <NoteItem title={'title'} time={'18 November 2022'} summary={'Ini adalah summary'}  />
        </div>
      </div>
    </>
  )
}

export default NotesPage;