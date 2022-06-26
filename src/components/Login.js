import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fakeApi from './fakeApi'

export default function Login(props) {

    const navigate = useNavigate();
    const InputValues = { username: "", password: "", type: "" }
    const [loginValues, setLoginVal] = useState(InputValues)
    const [loginErrors, setLoginErr] = useState({})
    const [users, setUsers] = useState(null)
    props.authenticate("")

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginVal({ ...loginValues, [name]: value })
    }

    const loginForm = () => {
        setLoginErr(validation(loginValues));

        for (let i of users) {
            if (loginValues.username !== "" && loginValues.password !== "") {
                if (i.username === loginValues.username && i.password === loginValues.password) {
                    if (i.type === "admin") {
                        alert("Welcome admin Login Successful");
                        props.authenticate("admin");
                        navigate("/loggedIn")
                    }
                    if (i.type === "user") {
                        alert("Welcome User Login Successful");
                        props.authenticate("user");
                        navigate("/loggedIn")
                    }
                    break;
                }
            }
        }
    }
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
    const validation = (val) => {
        const err = {}
        if (!val.username) {
            err.username = "Username is Required"
        } else {
            for (let i of users) {
                if (i.username === val.username) {
                    err.username = ""
                    break
                }
                else {
                    err.username = "Username is Invalid"
                }
            }
        }
        if (!val.password) {
            err.password = "Password is Required"
        } else {
            for (let i of users) {
                if (i.password === val.password) {
                    err.password = ""
                    return err;
                } else {
                    err.password = "Password is Invalid"
                }
            }
        }
        return err;
    }

    return (
        <div>
            <h1>Log In </h1>
            <form>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-8 col-form-label">Username</label>
                    <div className=" container col-sm-5">
                        <input type="text" autoComplete='off' className="form-control" name="username" value={loginValues.username} onChange={handleChange} ></input>
                    </div>
                    <p className="text-danger">{loginErrors.username}</p>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-8 col-form-label">Password</label>
                    <div className="container col-sm-5">
                        <input type="password" autoComplete='off' className="form-control" name="password" value={loginValues.password} onChange={handleChange}></input>
                    </div>
                    <p className="text-danger">{loginErrors.password}</p>
                </div>

                <div className="d-grid gap-2 col-3 mx-auto ">
                    <button className="btn btn-primary" type="button" onClick={loginForm}>Log In</button>
                </div>

                <div>
                    If You Are not Register then click on <Link to='/signup'>Signup Page</Link>
                </div>
            </form>
        </div>
    )
}
