import React, { useState, memo, useEffect } from "react";
import "./style.scss";

const Post = ({
  id,
  title,
  content,
  onTitleUpdate,
  onPostDelete,
  selectTile,
}) => {
  console.log("id: ", id);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleTitleEdit = () => {
    setEditMode(true);
    setNewTitle(title);
  };

  const handleTitleEditCancel = () => {
    setEditMode(false);
    setNewTitle("");
  };

  const handleTitleChange = e => {
    setNewTitle(e.target.value);
  };

  const handleSaveTitle = id => {
    if (onTitleUpdate) {
      onTitleUpdate(newTitle, id);
    }
    setEditMode(false);
  };

  useEffect(() => {
    return () => {
      console.log("component unmount with react hooks");
    };
  }, []);

  return (
    <div className="post-container">
      <div className="title-container">
        {editMode ? (
          <input type="text" value={newTitle} onChange={handleTitleChange} />
        ) : (
          <h4>{title}</h4>
        )}
        {editMode && (
          <div className="title-form-actions">
            <button onClick={handleTitleEditCancel}>Cancel</button>
            <button onClick={() => handleSaveTitle(id)}>Save</button>
          </div>
        )}
        {!editMode && (
          <div className="post-button-container">
            <button
              className="post-buttons"
              type="button"
              onClick={() => onPostDelete(id)}
            >
              Delete
            </button>
            <button
              className="post-buttons"
              type="button"
              onClick={handleTitleEdit}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <div onClick={() => selectTile(id)}>{content}</div>
    </div>
  );
};

export default memo(Post);
