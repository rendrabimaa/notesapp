import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { sweetConfirm } from '../utils/sweet-alert';

function EditCategory({categories, onDeleteCategory, onEditCategory}) {
    // const [categorie, setCategorie] = useState([
    //   {
    //     id:1,
    //     name: 'John'
    //   },{
    //     id:2,
    //     name:'jane'
    //   },{
    //     id:3,
    //     name: 'lol'
    //   }
    // ])
    const [name, setName] = useState("")
    const [category, setCategory] = useState([])
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        console.log(categories);
        setCategory(categories);
    }, [])

    const handleCloseModal = () => {
        setShowModal(false);
    }

    // const handleEditCategory = (event, index) => {
    //     const updatedCategory = [...editedCategory];
    //     updatedCategory[index] = event.target.value;

    //     setCategory(updatedCategory);
    //     // console.log(inputCategory)
    // }

    const handleDeleteCategory = async (id) => {
      await onDeleteCategory(id)
    }

    const handleEditChange = (event) => {
      setCategory(event.target.value)
    }

    const handleEditCategory = (event, id) => {
      onEditCategory(event.target.value, id) 
      // const updateData = category.map(item => {
      //   if(item.id === id) {
      //     return { ...item, name}
      //   }
      //   return item
      // })

      // setCategory(updateData);
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
                {category.map((cat, index) => (
                    <li key={index} className='list-category-edit'>
                      {/* <form onSubmit={event => handleSubmit(event, cat.id)}> */}
                        <input type="text"
                        value={cat.name}
                        onChange={handleEditChange}
                        />
                        <button className='edit-category-button' onClick={handleEditCategory}>V</button>
                        <button className='delete-category-button' onClick={() => handleDeleteCategory(cat.id)}>&times;</button>

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