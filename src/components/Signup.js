import React, { useEffect, useState } from 'react'
import '../App.css'
import fakeApi from './fakeApi'
import { Link, Navigate } from 'react-router-dom'

export default function Signup() {
  const [userDetail, setUserDetails] = useState({
    type: "",
    username: "",
    password: "",
    conpassword: ""
  })
  const [users, setUsers] = useState(null)
  const [signupError, setSignupErr] = useState({})
  const [isSignupbtn, setisSignupbtn] = useState({ isNav: "false" })


  const handleInputs = (e) => {
    const { name, value } = e.target
    setUserDetails({ ...userDetail, [name]: value })
    setisSignupbtn({ isNav: "true" })
  }


  //Fetch Data from custom json-server
  const getData = async () => {
    const respo = await fakeApi.get("/user");
    return respo.data;

  }
  useEffect(() => {
    const getAllData = async () => {
      const allData = await getData();
      if (allData) setUsers(allData);
    };
    getAllData()
  }, [])

  const addInputData = async () => {
    console.log(userDetail)

    setSignupErr(validation(userDetail))
    const { type, username, password, conpassword } = userDetail
    if (username !== "" && password !== "" && conpassword !== "" && password.length >= 6 && password === conpassword) {
      const req = {
        type,
        username,
        password,
      }
      const respo = await fakeApi.post("/user", req)
      users.push(respo.data)
      alert("User Registration done successfully")
      console.log(isSignupbtn);
      setUserDetails({ username: "", password: "", conpassword: "", type: "" })
    }
  }

  const validation = (val) => {
    const error = {}

    if (!val.username) {
      error.username = "Username must be require for Signup"
    }
    if (!val.password) {
      error.password = "Password must be require for Signup"
    } else if (val.password.length <= 6) {
      error.password = "Password has to more than 6 characters"
    }
    if (!val.conpassword) {
      error.conpassword = "Confirm password must be require for Signup"
    } else if (val.password !== val.conpassword) {
      error.conpassword = "Confirm Password Does Not Match"
    }
    if (val.type === "Select Type" || val.type === "") {
      error.type = "Please Select User Type"
    }
    return error;
  }

  return (
    <div>
      <h1>SignUp</h1>
      <form>
        <div className="container col-sm-2">
          <select className="form-select" name="type" onChange={handleInputs}>
            <option>Select Type</option>

            <option name="type" value="admin" onChange={handleInputs}>Admin</option>
            <option name="type" value="user" onChange={handleInputs}>User</option>
            <option name="type" value="guest" onClick={handleInputs}>{userDetail.type === "guest" && <Navigate to="/Guest"></Navigate>}Guest</option>

          </select>
          <p className="text-danger">{signupError.type}</p>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-8 col-form-label">Username</label>
          <div className=" container col-sm-5">
            <input type="text" autoComplete='off' className="form-control" name="username" value={userDetail.username} onChange={handleInputs}></input>
          </div>
          <p className="text-danger">{signupError.username}</p>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-8 col-form-label">Password</label>
          <div className="container col-sm-5">
            <input type="password" autoComplete='off' className="form-control" name="password" value={userDetail.password} onChange={handleInputs}></input>
          </div>
          <p className="text-danger">{signupError.password}</p>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-8 col-form-label">Confirm Password</label>
          <div className="container col-sm-5">
            <input type="password" autoComplete='off' className="form-control" name="conpassword" value={userDetail.conpassword} onChange={handleInputs}></input>
          </div>
          <p className="text-danger">{signupError.conpassword}</p>
        </div>

        <div className="d-grid gap-2 col-3 mx-auto">
          <button className="btn btn-primary" type="button" onClick={addInputData}>Sign Up</button>
        </div>

        <div>
          If You done with sign up then click on <Link to="/login">Login Page</Link>
        </div>

      </form>
    </div>
  )
}
