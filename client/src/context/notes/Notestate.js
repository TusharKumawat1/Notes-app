import NoteContext from "./Notecontext";
import {  useState } from "react";

const Notestate = (props) => {

    // alert Component rendring
    const [alert, setalert] = useState(false)
    const [bg, setbg] = useState("")
    const [msg, setmsg] = useState("")
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial);
  //get note
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        }
      });
      const json = await response.json()

      setnotes(json)
    }
  //add note
  const addNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects
  
  
    setnotes(notes.concat(note));
  
    getNotes();
  };
  //update note
  const updateNotes = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (notes._id !== id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
    getNotes();
  };
  //delete note
  const deleteNote = async(id) => {
    {
      // API Call 
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        }
      });
      const json = await response.json()
    
      setnotes(json)
    }
   
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);

  };
  return (
    <NoteContext.Provider value={{ notes, addNotes, updateNotes, deleteNote ,getNotes,alert,setalert,bg,msg,setbg,setmsg}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default Notestate;
