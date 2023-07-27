import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { sweetConfirm } from '../utils/sweet-alert';


function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function EditCategory({categories, onDeleteCategory, onEditCategory}) {
    const [editCategory, setEditCategory] = useState([])
    const [bfrEditCategory, setBfrEditCategory] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      if(categories !== null ) {
        const deepCopyCategories = deepCopy(categories);
        setEditCategory(deepCopyCategories);
      }
    }, [categories])

    const isCategoryChanged = (bfrEditCategory, editedCategory) => {
      return bfrEditCategory !== editedCategory
    }

    const handleDeleteCategory = async (id) => {
      await onDeleteCategory(id)
    }

    const handleEditChange = (value, index) => {
      setEditCategory((prevCategory) => {
        const updatedCategory = [...prevCategory]
        updatedCategory[index].name = value
        return updatedCategory; 
      })

      console.log(editCategory[index].name)
      console.log(categories[index].name)
    }

    const handleCloseModal = () => {
      categories.forEach(name => {
        const editCat = editCategory.find((cat) => cat.id === name.id)
        if(editCat && isCategoryChanged(editCat.name, name.name)) {
          onEditCategory(editCat.name, editCat.id)
        }
      })
      setShowModal(false);
    }
  

    return (
        <div>
      <Button variant="primary" className='edit-category-button' onClick={() => setShowModal(true)}>
        Edit Categories
      </Button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <ul>
                {editCategory.map((category, index) => (
                    <li key={index} className='list-category-edit' id='edit-list'>
                      {/* <form onSubmit={event => handleSubmit(event, cat.id)}> */}
                        {/* <label htmlFor={`name${index}`}>Name { index + 1}</label> */}
                        <input type="text" id='edit-input'
                        className='edit-show'
                        name={`name${index}`}
                        value={category.name}
                        onChange={(event) => handleEditChange(event.target.value, index)}
                        />
                        {/* <button id='edit-category-button' >V</button> */}
                        <button className='delete-category-button' onClick={() => handleDeleteCategory(category.id)}>&times;</button>

                      {/* </form> */}
                    </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    )
}

export default EditCategory;