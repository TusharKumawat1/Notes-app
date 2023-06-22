import React, { useContext, useEffect, useRef, useState ,} from "react";
import {useNavigate} from "react-router-dom"
import NoteContext from "../context/notes/Notecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
const Notes = () => {
  const [id, setid] = useState("")
  const context = useContext(NoteContext);
  var tag="General"
  const { notes, getNotes,updateNotes } = context;
  let navigate=useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      
      getNotes();
    } else {
      navigate("/login")
    }
     // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const toggleModal = () => {
    ref.current.click();
  };
  const [note, setnote] = useState({ e_title: "", e_description: "",});
  const handleClick = (e) => {
    e.preventDefault();
    ref.current.click();
    updateNotes(id,note.e_title,note.e_description,tag)
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const updateNote=(currentNote)=>{
    setnote({e_title:currentNote.title,e_description:currentNote.description})
    setid(currentNote._id)
  }
  return (
    <>
      <Addnote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row my-2">
                  <label htmlFor="e_title" className="col-sm-2 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="e_title"
                      name="e_title"
                      placeholder="title"
                      value={note.e_title}
                      onChange={onchange}
                      minLength={3} required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="e_description"
                    className="col-sm-2 col-form-label my-2"
                  >
                    Description{" "}
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control my-2"
                      id="e_description"
                      name="e_description"
                      placeholder="Description"
                      value={note.e_description}
                      minLength={3} required
                      onChange={onchange}
                    />
                  </div>
                </div>
                <fieldset className="form-group">
      <div className="row ">
        <legend className="col-form-label col-sm-2 pt-0 ">Tag</legend>
        <div className="col-sm-10">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1"onClick={()=>{tag="Personal"}}/>
            <label className="form-check-label" htmlFor="gridRadios1" onClick={()=>{tag="Personal"}}>
              Personal
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"onClick={()=>{tag="General"}}/>
            <label className="form-check-label" htmlFor="gridRadios2"onClick={()=>{tag="General"}}>
             General
            </label>
          </div>
          <div className="form-check ">
            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" onClick={()=>{tag="Other"}}/>
            <label className="form-check-label" htmlFor="gridRadios3"onClick={()=>{tag="Other"}}>
              Other
            </label>
          </div>
        </div>
      </div>
    </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={toggleModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.e_title.length<3||note.e_description.length<3}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="coniatner my-3">
           {notes.length===0 ? <h2 className="text-center">No Notes To Display</h2>: <h2 className="text-center">Your Notes</h2>}
   
        <div className="row ">
          {notes.map((notes) => {
            return (
              <Noteitem
                key={notes._id}
                notes={notes}
                toggleModal={toggleModal}
                updateNote={updateNote}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Notes;
