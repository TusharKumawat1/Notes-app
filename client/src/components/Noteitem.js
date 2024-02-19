import React, { useContext } from 'react'
import NoteContext from '../context/notes/Notecontext'
const Noteitem = (props) => {
  const context=useContext(NoteContext);
    const {notes,toggleModal,updateNote}=props;
    const {deleteNote}=context;
  return (
   
    <div className='col-md 3 my-3 '>
      <div className="card sizing" >
  <div className="card-body">
    <h5 className="card-title">{notes.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{notes.tag}</h6>
    <p className="card-text">{notes.description}</p>
    <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{toggleModal();updateNote(notes)}} ></i>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(notes._id);}}></i>
  </div>
</div>
    </div>
  )
}

export default Noteitem;
