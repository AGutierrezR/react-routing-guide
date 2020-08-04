import React, { Component } from 'react'
import Post from '../../../components/Post/Post'
import './Post.css'
import axios from '../../../axios'
// import { Link } from 'react-router-dom'

class Posts extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    axios
      .get('/posts')
      .then((res) => {
        const posts = res.data.slice(0, 4)
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: 'Andres',
          }
        })
        this.setState({
          posts: updatedPosts,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  postSelectedHandler = (id) => {
    this.props.history.push({pathname: '/' + id})
  }

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong </p>
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // <Link to={'/' + post.id} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              key={post.id}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          // </Link>
        )
      })
    }
    return <section className="Posts">{posts}</section>
  }
}

export default Posts
