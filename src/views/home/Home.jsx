import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import BlogList from "../../components/blog/blog-list/BlogList"
import "./styles.css"

const Home = (props) => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const getBlogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}blogs`)
      if (response.ok) {
        const data = await response.json()
        console.log(blogs)
        setBlogs(data.blogs)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      getBlogs()
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Epicode Blog!</h1>
      <BlogList blogs={blogs} />
    </Container>
  )
}

export default Home
