import React from "react";
import { useState } from "react";
import { MdDeleteForever, MdOutlineModeEditOutline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import useInput from "../hooks/useInput";
import CreatableReactSelect from 'react-select/creatable';

const Category = ({ id, name, handleEditCategory, handleDeleteCategory, setCategoryActive }) => {
  const navigate = useNavigate();

  const [editActive, setEditActive] = useState(false);
  const [newName, setNewName] = useInput(name);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleBtnEditCategory() {
    if (editActive) {
      return setEditActive(false);
    }
    setEditActive(true);
  }

  function handleBtnCancel() {
    setEditActive(false);
  }

  function handleBtnSave() {
    handleEditCategory(newName, id, setEditActive);
  }

  function handleViewCategory(id) {
    setCategoryActive(id);
    navigate('/notes');
  }

  function handleSelectChange(option) {
    setSelectedOption(option);
    if (option) {
      setNewName(option.label);
    } else {
      setNewName(""); 
    }
  }

  return (
    <div className="category">
      <div className='title'>
        <button onClick={() => handleViewCategory(id)}>{name}</button>
      </div>
      {editActive ? (
        <div className="category-footer">
          <CreatableReactSelect
            isClearable
            onChange={handleSelectChange}
            value={selectedOption}
            onCreateOption={label => {
              handleSelectChange({ label, value: label });
            }}
            options={[
              { label: name, value: name },
            ]}
          />
          <button className="save" onClick={handleBtnCancel}>Cancel</button>
          <button className="save" onClick={handleBtnSave}>Save</button>
        </div>
      ) : (
        <div className="category-footer">
          <MdOutlineModeEditOutline className='delete-icons' size='1.3em' onClick={handleBtnEditCategory} />
          <MdDeleteForever
            onClick={() => handleDeleteCategory(id)}
            className='delete-icons'
            size='1.3em' />
        </div>
      )}
    </div>
  )
}

export default Category;