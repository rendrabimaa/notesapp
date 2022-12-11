import React from "react";
import NavigationLogin from "../components/NavigationLogin";
import CategoriesList from "../components/CategoriesList";
import Search from "../components/Search";
import { useState } from "react";
import { getCategories, postCategories, editCategories, deleteCategories } from "../utils/api";

function CategoriesPage({ user, setUser, setCategoryActive }) {
  const [categories, setCategories] = useState(null);

  const [searchName, setSearchName] = useState('');

  React.useEffect(() => {
    async function fetchCategories() {
      const { data } = await getCategories();

      setCategories(data);
    }
    fetchCategories();
  }, []);

async function addCategory(name, setName) {
  const { error, message } = await postCategories({
    name,
  });

  if (!error) {
    const { data } = await getCategories();

    setCategories(data);
    setName('');
    return alert(message);
  }

  alert(message);
}

async function deleteCategory(id) {
  await deleteCategories(id);
  
  const { data } = await getCategories();
  setCategories(data);
}

async function editCategory(name, id, setEditActive) {
  const { error, message } = await editCategories({
    name,
  }, id);

  if (!error) {
    const { data } = await getCategories();

    setCategories(data);
    setEditActive(false);
    return alert(message);
  }

  alert(message);
}

let printElementCategories = <p>Loading...</p>;

if (categories !== null) {
  printElementCategories = (
    <CategoriesList 
      categories={categories.filter((category) => 
        category.name.toLowerCase().includes(searchName)
      )}
      handleAddCategory={addCategory}
      handleEditCategory={editCategory}
      handleDeleteCategory={deleteCategory}
      setCategoryActive={setCategoryActive}
    />
  )
}

  return (
    <>
      <NavigationLogin user={user} setUser={setUser} />
      <div className="notes-page-container">
        <Search handleSearchCategory={setSearchName} />
        <div className="notes-container">
          {printElementCategories}
        </div>
      </div>
    </>
  )
}

export default CategoriesPage;