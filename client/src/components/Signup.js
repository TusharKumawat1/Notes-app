import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/Notecontext";
export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { setalert, setbg, setmsg } = context;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://notesapp-gwf1.onrender.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      setalert(true);
      setbg("teal");
      setmsg("Signup Successfully");
      setTimeout(() => {
        setalert(false);
      }, "2000");
    } else {
      setalert(true);
      setbg("red");
      setmsg("Please enter right credentials");
      setTimeout(() => {
        setalert(false);
      }, "2000");
    }
  };
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex justify-content-center align-items-center my-10">
      <div className="w-full max-w-xs  ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              onChange={onchange}
              name="name"
              value={credentials.name}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Email"
              type="email"
              placeholder="@email.com"
              name="email"
              onChange={onchange}
              value={credentials.email}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={onchange}
              name="password"
              value={credentials.password}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Signup
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/login"
            >
              Login?
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;Developed by Tushar
        </p>
      </div>
    </div>
  );
}
