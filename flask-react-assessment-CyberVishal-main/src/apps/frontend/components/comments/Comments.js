import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Load all comments
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/comments/")
      .then(res => setComments(res.data))
      .catch(err => console.error("Error fetching comments:", err));
  }, []);

  // Add a new comment
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    axios.post("http://127.0.0.1:5000/api/comments/", { text: newComment })
      .then(res => {
        setComments([...comments, res.data]);
        setNewComment("");
      })
      .catch(err => console.error("Error adding comment:", err));
  };

  // Delete comment
  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/comments/${id}`)
      .then(() => setComments(comments.filter(c => c.id !== id)))
      .catch(err => console.error("Error deleting comment:", err));
  };

  return (
    <div style={{ margin: "40px", fontFamily: "Arial" }}>
      <h2>Comments Section</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={{ padding: "10px", width: "60%" }}
        />
        <button
          onClick={handleAddComment}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Add
        </button>
      </div>

      <ul>
        {comments.map((c) => (
          <li key={c.id} style={{ marginBottom: "10px" }}>
            {c.text}
            <button
              onClick={() => handleDelete(c.id)}
              style={{
                marginLeft: "15px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
