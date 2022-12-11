import React from "react";
import NavigationLogin from "../components/NavigationLogin";
import CategoriesList from "../components/CategoriesList";
import Search from "../components/Search";
import { nanoid } from "nanoid";
import { useState } from "react";

function CategoriesPage({ user, setUser }) {
  // HAPUS YANG INI
  const [categories, setCategories] = useState([
    {
    id: nanoid(),
    name: 'new category',
    },
    {
    id: nanoid(),
    name: 'new category',
    },
    {
    id: nanoid(),
    name: 'new category',
    },
    {
    id: nanoid(),
    name: 'new category',
    }
])

const [searchName, setSearchName] = useState('');

const addCategory = (name) => {
  const newCategory = {
    id: nanoid(),
    name: name,
  }
  const newCategories = [...categories, newCategory];
  setCategories(newCategories);
}

const deleteCategory = (id) => {
  const newCategories = categories.filter((category) => category.id !== id);
  setCategories(newCategories);
}

  return (
    <>
      <NavigationLogin user={user} setUser={setUser} />
      <section className="cat-sec">
      <div className="notes-page-container">
        <Search handleSearchCategory={setSearchName} />
        <div className="notes-container">
          <CategoriesList 
            categories={categories.filter((category) => 
              category.name.toLowerCase().includes(searchName)
            )}
            handleAddCategory={addCategory}
            handleDeleteCategory={deleteCategory}
            />
        </div>
      </div>

      </section>
      
    </>
  )
}

export default CategoriesPage;