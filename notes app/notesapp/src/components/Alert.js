import React,{useContext} from 'react'
import NoteContext from "../context/notes/Notecontext";
export default function Alert(props) {
    const context = useContext(NoteContext);
    const {alert,bg,msg}=context;
  return (
   alert && <div className={`bg-${bg}-100 border border-black-400 text-black-700 px-4 py-3 rounded relative` }role="alert">
    <strong className="font-bold">!</strong>
    <span className="block sm:inline">{msg}.</span>
  </div>
  )
}
