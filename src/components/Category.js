import { MdDeleteForever, MdOutlineModeEditOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Category = ({id, name, handleDeleteCategory}) => {
  return <div className="category">
    <Link to='/'>{name}</Link>
    <div className="category-footer">
      <MdOutlineModeEditOutline className='delete-icons' size='1.3em' />
      <MdDeleteForever
        onClick={() => handleDeleteCategory(id)}
        className='delete-icons' 
        size='1.3em' />
    </div>
  </div>
}

export default Category;