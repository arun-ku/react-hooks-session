import React, { Component } from "react";
import "./style.scss";

export default class Post extends Component {
  state = {
    editMode: false,
    newTitle: "",
  };

  componentWillUnmount() {
      console.log('component unmount without react hooks');
  }

  handleTitleEdit = () => {
    this.setState({ editMode: true, newTitle: this.props.title });
  };

  handleTitleEditCancel = () => {
    this.setState({ editMode: false, newTitle: "" });
  };

  handleTitleChange = e => {
    this.setState({ newTitle: e.target.value });
  };

  handleSaveTitle = (id) => {
    const { newTitle } = this.state;
    const { onTitleUpdate } = this.props;

    if (onTitleUpdate) {
        onTitleUpdate(newTitle, id);
    }
    this.setState({ editMode: false });
  };

  render() {
    const { id, title, content, onPostDelete, selectTile } = this.props;
    const { editMode, newTitle } = this.state;

    return (
      <div className="post-container">
        <div className="title-container">
          {editMode ? (
            <input
              type="text"
              value={newTitle}
              onChange={this.handleTitleChange}
            />
          ) : (
            <h4>{title}</h4>
          )}
          {editMode && (
            <div className="title-form-actions">
              <button onClick={this.handleTitleEditCancel}>Cancel</button>
              <button onClick={() => this.handleSaveTitle(id)}>Save</button>
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
            onClick={this.handleTitleEdit}
          >
            Edit
          </button>
          </div>
        )}
        </div>
        <div onClick={() => selectTile(id)}>{content}</div>
      </div>
    );
  }
}
