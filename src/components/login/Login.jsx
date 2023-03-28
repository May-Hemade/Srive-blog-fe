import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const navigate = useNavigate()

  const fetchLogin = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_HOST}authors/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      if (response.ok) {
        let { accessToken } = await response.json()
        setToken(accessToken)
        localStorage.setItem("token", JSON.stringify(token))
        navigate("/")
        console.log(token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //   useEffect(() => {
  //     localStorage.setItem("token", JSON.stringify(token))
  //   }, [token])

  useEffect(() => {
    console.log(token)
  }, [token])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchLogin()
  }

  return (
    <div>
      <form className="formt" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
