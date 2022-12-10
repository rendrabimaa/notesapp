import Category from "./Category";
import AddCategory from "./AddCategory";

const CategoriesList = ({ categories, handleAddCategory, handleDeleteCategory }) => {
  return (
    <div className="categories-list">
      {categories.map((category) => (
        <Category
        id={category.id}
        name={category.name}
        handleDeleteCategory={handleDeleteCategory}
        />
      ))}
      <AddCategory handleAddCategory={handleAddCategory} />
    </div>
  )
}

export default CategoriesList;