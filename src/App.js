import Signup from "./components/Signup";
import './App.css'
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import { useState } from "react";
import { Navigate } from "react-router-dom"
import User from "./components/User";

function App() {
  const [user, setUser] = useState(null)
  console.log(user);

  const auth = (verify) => {
    setUser(verify)
    localStorage.setItem("users", verify)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {(user !== "admin" || user !== "user") && <>(
            <Route path='/login' element={<Login authenticate={auth} />}></Route>
            <Route path="/signup" element={<Signup />}></Route>)</>}

          {(user === "admin" || localStorage.getItem("users") === "admin") && <>(<Route path="/loggedIn" element={<Admin />}></Route>)</>}

          {(user === "user" || localStorage.getItem("users") === "user") && <>(<Route path="/loggedIn" element={<User />}></Route>)</>}

          <Route path='*' element={<Navigate to={user ? "/" : "/login"} />}></Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
