import React from "react";
import EditNote from "../components/EditNote";
import NavigationLogin from "../components/NavigationLogin";

function EditNotePage({ user, setUser }){
  return(
    <>
      <NavigationLogin user={user} setUser={setUser} />
      <EditNote/>
    </>
  )
}

export default EditNotePage;