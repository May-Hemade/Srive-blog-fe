import { convertToHTML } from "draft-convert"
import { EditorState } from "draft-js"
import React, { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "./styles.css"
const NewBlogPost = (props) => {
  const postBlogs = async (event) => {
    event.preventDefault()
    let blog = {
      title,
      category,
      cover:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      author: {
        name: "someone",
        ID: "qwerewr121",
        avatar:
          "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      },
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}blogs`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(blog),
      })
      if (response.ok) {
        const data = await response.json()
        postImage(data._id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const postImage = async (id) => {
    const formData = new FormData()
    formData.append("cover", cover)
    try {
      let response = await fetch(
        `${process.env.REACT_APP_HOST}blogs/${id}/uploadCover`,
        {
          headers: {},
          method: "POST",
          body: formData,
        }
      )
      if (response.ok) {
        const data = await response.json()
      }
    } catch (error) {}
  }

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [cover, setCover] = useState(null)

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [html, setHTML] = useState(null)
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent())
    setHTML(html)
  }, [editorState])
  return (
    <Container className="new-blog-container">
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0])
          setCover(event.target.files[0])
        }}
      ></input>
      <Form className="mt-5" onSubmit={postBlogs}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            onChange={(event) => setCategory(event.target.value)}
          >
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default NewBlogPost
