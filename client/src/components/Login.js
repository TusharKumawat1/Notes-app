import React,{useState,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import NoteContext from "../context/notes/Notecontext";
export default function Login() {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let navigate=useNavigate();
    const context = useContext(NoteContext);
    const { setalert ,setbg,setmsg} = context;
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`https://notesapp-gwf1.onrender.com/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
           
          }, body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
                //redirect
                setalert(true)
                setbg("teal")
                setmsg("Login Successfully")
                setTimeout(()=>{setalert(false)},"2000")
                localStorage.setItem("token",json.authtoken)
                navigate("/");
        }else{
          setalert(true)
          setbg("red")
          setmsg("Please enter right credentials")
          setTimeout(()=>{setalert(false)},"2000")
        }
      }
      const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <div className='d-flex justify-content-center align-items-center my-10 '>
    <div className="w-full max-w-xs  ">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
     
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email" >
          Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" type="email" placeholder="@email.com" name='email' value={credentials.email} onChange={onchange}/>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="************" value={credentials.password} name='password'  onChange={onchange}/>
        {credentials.password.length!==0?"":  <p className="text-red-500 text-xs italic">Please enter password.</p>}
      
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
          Login
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/">
          Forgot Password?
        </a>
      </div>
    </form>
    <p className="text-center text-gray-500 text-xs">
      &copy;Developed by Tushar
    </p>
  </div>
  </div>
  )
}
