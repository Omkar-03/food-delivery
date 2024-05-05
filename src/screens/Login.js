import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [credentials, setcredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:5000/api/loginuser/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json()

    if (!json.success) {
      alert("Invalid credentials !!!")
    } else {
      localStorage.setItem("userEmail", credentials.email)

      localStorage.setItem("authToken", json.authToken)
      navigate("/")
    }
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container p-4 rounded' style={{ margin: " 13rem 20rem", width: "50rem", backgroundColor: 'wheat' }}>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>

          <button type="submit" className="m-3 btn btn-danger">Submit</button>
          <Link to="/signup" className='m-3 btn btn-success'>Don't have an account ?</Link>
        </form>

      </div>
    </>
  )
}
