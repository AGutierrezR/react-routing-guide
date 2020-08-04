import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
// import axios from 'axios';
import axios from '../../axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount () {
        axios.get('/posts')
            .then(res => {
                const posts = res.data.slice(0, 4)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Andres'
                    }
                })
                this.setState({
                    posts : updatedPosts
                })
            })
            .catch(err => {
                this.setState({error: true})
                console.log(err);
            })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong </p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    title={post.title} 
                    author={post.author} 
                    key={post.id}
                    clicked={() => this.postSelectedHandler(post.id)}/>
            })
        }

        return (
            <div>
                <section className="Posts">
                    { posts }
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;