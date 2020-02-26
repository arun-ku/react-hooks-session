import React, { useState, useEffect, useCallback, useMemo } from "react";
import Post from "./Post";
import "./style.scss";

export default () => {
  const [posts, setPosts] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(res => setPosts(res));
  }, [setPosts]);

  const onTitleUpdate = useCallback(
    (newTitle, id) => {
      setPosts(posts => {
        const post = posts.find(({ id: postId }) => postId === id);
        post.title = newTitle;
        return [...posts];
      });
    },
    [setPosts]
  );

  const onPostDelete = useCallback(
    id => {
      setPosts(posts => {
        const newPosts = posts.filter(({ id: postId }) => postId !== id);
        return [...newPosts];
      });
    },
    [setPosts]
  );

  const selectTile = useCallback(id => {
    setSelectedTile(id);
  }, []);

  const getLargestWord = useCallback(post => {
    console.log("Finding largest word");
    let largestWord = "";
    post &&
      post.body.split("\n").forEach(line =>
        line.split(" ").forEach(word => {
          if (word.length > largestWord.length) {
            largestWord = word;
          }
        })
      );

    return largestWord;
  }, []);

  const post = posts.find(({ id: postId }) => postId === selectedTile);

  const longestWord = useMemo(() => getLargestWord(post), [
    getLargestWord,
    post
  ]);

  return (
    <div>
      <div>
        {selectedTile ? (
          <h2>{`Largest word in selected is: ${longestWord}`}</h2>
        ) : null}
      </div>
      <div className="posts-base with-hooks">
        {posts.map(post => {
          return (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.body}
              onTitleUpdate={onTitleUpdate}
              onPostDelete={onPostDelete}
              selectTile={selectTile}
            />
          );
        })}
      </div>
    </div>
  );
};
