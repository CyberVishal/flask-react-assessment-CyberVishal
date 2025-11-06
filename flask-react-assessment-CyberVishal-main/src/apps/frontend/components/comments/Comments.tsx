import React, { useState, useEffect } from "react";
import axios from "axios";

interface Comment {
  id: number;
  text?: string;
  content?: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/comments/")
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/comments/", {
        text: newComment,
      });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/comments/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Comments</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={{ padding: 8, width: "60%" }}
        />
        <button
          onClick={handleAdd}
          style={{
            marginLeft: 8,
            padding: "8px 12px",
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
          <li key={c.id} style={{ marginBottom: 8 }}>
            {c.text || c.content}
            <button
              onClick={() => handleDelete(c.id)}
              style={{
                marginLeft: 12,
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
