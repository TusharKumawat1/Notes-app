import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/Notecontext";
const Addnote = () => {
  var tag = "General";
  const context = useContext(NoteContext);
  const { addNotes } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, tag);
    setnote({ title: "", description: "", tag: "" })
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };  
  return (
    <div>
      <h2 className="text-center">Add Notes</h2>
      <form>
        <div className="form-group row my-2">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="title"
              onChange={onchange}
              minLength={3} required
              value={note.title}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="description" className="col-sm-2 col-form-label my-2">
            Description{" "}
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Description"
              onChange={onchange}
              minLength={3} required
              value={note.description}
            />
          </div>
        </div>
        <fieldset className="form-group">
          <div className="row ">
            <legend className="col-form-label col-sm-2 pt-0 ">Tag</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="option1"
                  onClick={() => {
                    tag = "Personal";
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="gridRadios1"
                  onClick={() => {
                    tag = "Personal";
                  }}
                >
                  Personal
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="option2"
                  onClick={() => {
                    tag = "General";
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="gridRadios2"
                  onClick={() => {
                    tag = "General";
                  }}
                >
                  General
                </label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios3"
                  value="option3"
                  onClick={() => {
                    tag = "Other";
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="gridRadios3"
                  onClick={() => {
                    tag = "Other";
                  }}
                >
                  Other
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <div className="form-group row">
          <div className="col-sm-20">
            <button
              type="submit"
              className="btn btn-primary"
              on
              onClick={handleClick}
              disabled={note.title.length<3||note.description.length<3}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addnote;
