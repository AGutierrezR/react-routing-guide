import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount() {
        const id = this.props.match.params.id
        if(id) {
            if(!this.state.loadedPost || (this.state.loadedPost && id !== this.state.loadedPost.id)) {
                axios.get(`/posts/${id}`)
                    .then(res => {
                        this.setState({loadedPost: res.data})
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete(`/posts/${this.props.id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;