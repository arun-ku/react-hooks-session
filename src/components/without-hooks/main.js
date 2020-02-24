import React, { Component } from "react";
import Post from "./Post";
import "./style.scss";

export default class Main extends Component {
  state = {
    posts: [],
    selectedTile: null
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(res => this.setState({ posts: res }));
  }

  onTitleUpdate = (newTitle, id) => {
    const { posts } = this.state;
    const post = posts.find(({ id: postId }) => postId === id);
    post.title = newTitle;
    this.setState({ posts: posts });
  };

  onPostDelete = id => {
    const { posts } = this.state;
    const newPosts = posts.filter(({ id: postId }) => postId !== id);
    this.setState({ posts: newPosts });
  };
  selectTile = id => {
    this.setState({ selectedTile: id });
  };

  getLargestWord = () => {
    console.log('Finding largest word');
    const { posts, selectedTile } = this.state;
    const post = posts.find(({ id: postId }) => postId === selectedTile);
    let largestWord = "";
    post &&
      post.body.split("\n").forEach(line => line.split(' ').forEach(word => {
        if (word.length > largestWord.length) {
          largestWord = word;
        }
      }));

    return largestWord;
  };

  render() {
    const { selectedTile, posts } = this.state;
    return (
      <div>
        <div>
          {selectedTile ? (
            <h2>{`Largest word in selected is: ${this.getLargestWord()}`}</h2>
          ) : null}
        </div>
        <div className="posts-base">
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.body}
                onTitleUpdate={this.onTitleUpdate}
                onPostDelete={this.onPostDelete}
                selectTile={this.selectTile}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
