import React, { useEffect, useState } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { sweetConfirm } from '../utils/sweet-alert';

function EditCategory({categories, onDeleteCategory}) {
    const [category, setCategory] = useState([])
    const [showModal, setShowModal] = useState(false);
    // const [inputCategory, setInputCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        // console.log(categories);
        // setInputCategory(categories);
        setCategory(categories);
    }, [])

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleEditCategory = (index, value) => {
        // const newData = inputCategory;
        // newData[index].name = value;

        // setInputCategory(value);
        // console.log(inputCategory)
    }

    const handleDeleteCategory = async (id) => {
      // if (!(await sweetConfirm())) {
      //   return;
      // }
      onDeleteCategory(id)
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
                {categories.map((category, index) => (
                    <li key={index} className='list-category-edit'>
                      <input  type="text" value={category.name} onChange={e => handleEditCategory(index, e.target.value)}/>
                      <button className='delete-category-button' onClick={() => handleDeleteCategory(category.id)}>&times;</button>
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